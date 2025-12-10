import './style.css';
import 'pannellum/build/pannellum.css';
import 'pannellum/build/pannellum.js';
import { GameEngine } from './game';
import { imageMapping } from './imageMapping';

// Pannellum is a UMD module that attaches to window
declare global {
  interface Window {
    pannellum: {
      viewer: (container: HTMLElement, config: any) => any;
    };
  }
}

const avatar_karl = "https://res.cloudinary.com/dmq8ipket/image/upload/v1764721613/Karl_iwr5ax.jpg"
const avatar_juri = "https://res.cloudinary.com/dmq8ipket/image/upload/v1764721614/Juri_kul0ml.jpg"

// Initialize game
const game = new GameEngine();

// Pannellum viewer instance
let viewer: any = null;

// UI elements
let storyOverlay: HTMLElement | null = null;
let storyTextElement: HTMLElement | null = null;
let characterInfoElement: HTMLElement | null = null;
let choicesContainer: HTMLElement | null = null;
let avatarElement: HTMLImageElement | null = null;
let achievementOverlay: HTMLElement | null = null;
let dragInstructionOverlay: HTMLElement | null = null;
let canvasOverlay: HTMLIFrameElement | null = null;

/**
 * Initialize Pannellum viewer
 */
function initPannellum(): void {
  const container = document.getElementById('pannellum-container');
  if (!container) return;

  // Wait for Pannellum to be available
  if (!window.pannellum) {
    console.error('Pannellum is not available');
    return;
  }

  // Create scenes object from imageMapping
  const scenes: { [key: string]: any } = {};
  const sceneViewSettings: Record<
    string,
    { pitch: number; yaw: number }
  > = {
    0: { pitch: 0, yaw: -20 },
    Scene_2c_Camp_Doodle_e: { pitch: 5, yaw: -20 },
    Scene_2c_Camp_Doodle_a: { pitch: 20, yaw: 50 },
    Scene_2c_Camp_Doodle_b: { pitch: 0, yaw: 60 },
    Scene_2c_Camp_Doodle_c: { pitch: 5, yaw: -50 },
    Scene_2c_Camp_Doodle_d: { pitch: 5, yaw: -70 },
  };
  Object.entries(imageMapping).forEach(([knot, url]) => {
    const viewSettings = sceneViewSettings[knot];
    scenes[knot] = {
      type: 'equirectangular',
      panorama: url,
      autoLoad: true,
      ...(viewSettings ? viewSettings : {}),
    };
  });

  viewer = window.pannellum.viewer(container, {
    type: 'equirectangular',
    autoLoad: true,
    autoRotate: 0.4,
    showControls: false,
    keyboardZoom: true,
    mouseZoom: true,
    scenes: scenes,
  });

  // Add drag detection to hide instruction overlay
  setupDragDetection(container);

  updatePanorama();
}

const START_GAME_HOTSPOT_ID = 'startGame';

/**
 * Setup drag detection to hide instruction overlay
 */
function setupDragDetection(container: HTMLElement): void {
  let mouseDown = false;
  let startX = 0;
  let startY = 0;

  container.addEventListener('mousedown', (e) => {
    mouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  container.addEventListener('mousemove', (e) => {
    if (mouseDown && dragInstructionOverlay) {
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);
      
      // If mouse moved more than 5 pixels, consider it a drag
      if (deltaX > 5 || deltaY > 5) {
        dragInstructionOverlay.style.display = 'none';
      }
    }
  });

  container.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  // Also handle touch events for mobile
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0 && dragInstructionOverlay) {
      dragInstructionOverlay.style.display = 'none';
    }
  });
}

/**
 * Update panorama image based on current KNOT
 */
function updatePanorama(): void {
  if (!viewer) return;

  const currentKnot = game.getCurrentKnot();

  if (!currentKnot) return;
  // Load the matching scene
  viewer.loadScene(currentKnot);

  // Handle global "start game" hotspot for knot "0"
  if (currentKnot === '0') {
    // Ensure any previous instance is removed before adding
    try {
      (viewer as any).removeHotSpot?.(START_GAME_HOTSPOT_ID, currentKnot);
    } catch {
      // Ignore if it doesn't exist
    }

    const startGameHotspot = {
      id: START_GAME_HOTSPOT_ID,
      pitch: 15,
      yaw: 45,
      type: 'info',
      text: '',
      cssClass: "start",
      clickHandlerFunc: () => {
        // Reveal the DOM overlays when the user explicitly starts the game
        if (storyOverlay) {
          storyOverlay.style.display = 'block';
        }
        if (achievementOverlay) {
          achievementOverlay.style.display = 'block';
        }
        (viewer as any).removeHotSpot?.(START_GAME_HOTSPOT_ID, '0');

      }
    };

    (viewer as any).addHotSpot(startGameHotspot, currentKnot);
  } else {
    // Remove the hotspot when leaving knot "0"
    try {
      (viewer as any).removeHotSpot?.(START_GAME_HOTSPOT_ID, '0');
    } catch {
      // Ignore if it doesn't exist
    }
  }

  // Add / clear custom hotspots for specific scenes
  if (currentKnot === 'Scene_2c_Camp_Doodle') {
    const state = game.getCurrentState();
    const choices = state.choices || [];

    const hotspotPositions = [
      { pitch: 5, yaw: -20 },
      { pitch: 20, yaw: 50 },
      { pitch: 0, yaw: 60 },
      { pitch: 5, yaw: -50 },
      { pitch: 5, yaw: -70 },
    ];

    // Remove any existing hotspots for this scene so we can recreate them
    for (let i = 0; i < 5; i++) {
      const id = `campDoodle-hs-${i + 1}`;
      try {
        // Pannellum supports removing hotspots by id and scene ID
        (viewer as any).removeHotSpot?.(id, currentKnot);
      } catch {
        // Ignore if it doesn't exist
      }
    }

    // Map specific "Talk to X" choices to fixed hotspot slots 1–5.
    // Hotspot indices:
    // 1 → Talk to Piir
    // 2 → Talk to Kamenski
    // 3 → Talk to Sainas
    // 4 → Talk to comrad C
    // 5 → Talk to comrad D
    const talkMapping: { [key: string]: number } = {
      'Talk to Piir': 0,
      'Talk to Kamenski': 1,
      'Talk to Sainas': 2,
      'Talk to comrad C': 3,
      'Talk to comrad D': 4,
    };

    choices.forEach((rawText, choiceIndex) => {
      // Clean brackets like "[Talk to Piir]"
      const cleaned = rawText.trim().replace(/^\[|\]$/g, '');
      const hotspotIndex = talkMapping[cleaned];

      // Only create a hotspot if this choice is in our mapping
      if (hotspotIndex === undefined) return;

      const pos = hotspotPositions[hotspotIndex];
      if (!pos) return;

      const hotspotConfig = {
        id: `campDoodle-hs-${hotspotIndex + 1}`,
        pitch: pos.pitch,
        yaw: pos.yaw,
        type: 'info',
        text: cleaned, // hotspot text = cleaned choice text
        clickHandlerFunc: () => {
          // Hotspot triggers its corresponding mapped choice
          game.makeChoice(choiceIndex);
          updatePanorama();
          updateUI();
        },
      };

      (viewer as any).addHotSpot(hotspotConfig, currentKnot);
    });
  } else {
    // When leaving Scene_2c_Camp_Doodle, ensure its hotspots are cleared
    for (let i = 0; i < 5; i++) {
      const id = `campDoodle-hs-${i + 1}`;
      try {
        // Remove from the Camp Doodle scene explicitly
        (viewer as any).removeHotSpot?.(id, 'Scene_2c_Camp_Doodle');
      } catch {
        // Ignore if it doesn't exist
      }
    }
  }

  // Toggle the drawing iframe overlay for the special knot
  setCanvasOverlayVisibility(currentKnot === 'Scene_2c_Camp_Doodle_ea');
}

/**
 * Create UI overlay structure
 */
function createUIOverlay(): void {
  const app = document.getElementById('app');
  if (!app) return;

  // Create panorama container
  const panoramaContainer = document.createElement('div');
  panoramaContainer.id = 'pannellum-container';
  app.appendChild(panoramaContainer);

  // Create drag instruction overlay
  dragInstructionOverlay = document.createElement('div');
  dragInstructionOverlay.className = 'drag-instruction-overlay';
  dragInstructionOverlay.innerHTML = `
    <div class="drag-instruction-text">
      <h1 class="text-2xl font-bold">Estonia 1944</h1>
      <p class="text-lg">Drag the background to look around</p>
    </div>
  `;
  app.appendChild(dragInstructionOverlay);

  // Create achievement overlay
  achievementOverlay = document.createElement('div');
  achievementOverlay.className = 'achievement-overlay p-4';
  achievementOverlay.innerHTML = `
    <div class="card bg-base-100 bg-opacity-90 shadow-xl max-w-6xl mx-auto">
      <div class="card-body p-4">
        <div class="grid grid-cols-5 gap-2" id="achievements-container">
          <!-- Achievements will be dynamically generated -->
        </div>
      </div>
    </div>
  `;
  app.appendChild(achievementOverlay);
  // Hide achievement overlay initially; it will be shown when the game starts
  achievementOverlay.style.display = 'none';

  // Create story overlay
  storyOverlay = document.createElement('div');
  storyOverlay.className = 'story-overlay p-6';
  storyOverlay.innerHTML = `
    <div class="card bg-base-100 bg-opacity-90 shadow-xl max-w-4xl mx-auto">
      <div class="card-body">
        <div class="flex gap-4 items-start">
          <img id="avatar" class="hidden rounded-full w-20 h-20 object-cover flex-shrink-0" alt="Character avatar" />
          <div class="flex-1">
            <div id="character-info" class="mb-2"></div>
            <div id="story-text" class="text-lg mb-4 min-h-[4rem]"></div>
            <div id="choices-container" class="flex flex-col gap-2"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  app.appendChild(storyOverlay);
  // Hide story overlay initially; it will be shown when the game starts
  storyOverlay.style.display = 'none';

  // Get references to UI elements
  storyTextElement = document.getElementById('story-text');
  characterInfoElement = document.getElementById('character-info');
  choicesContainer = document.getElementById('choices-container');
  avatarElement = document.getElementById('avatar') as HTMLImageElement;

  // Create hidden canvas iframe overlay (shown only for specific knot)
  canvasOverlay = document.createElement('iframe');
  canvasOverlay.id = 'canvas-overlay';
  canvasOverlay.src = './canvas.html';
  canvasOverlay.style.position = 'fixed';
  canvasOverlay.style.top = '50%';
  canvasOverlay.style.left = '50%';
  canvasOverlay.style.transform = 'translate(-50%, -50%)';
  canvasOverlay.style.width = '25vw';
  canvasOverlay.style.height = '52vh';
  canvasOverlay.style.border = '0';
  canvasOverlay.style.zIndex = '2000';
  canvasOverlay.style.boxShadow = '0 10px 40px rgba(0,0,0,0.6)';
  canvasOverlay.style.display = 'none';
  app.appendChild(canvasOverlay);
}

/**
 * Show or hide the canvas overlay iframe
 */
function setCanvasOverlayVisibility(show: boolean): void {
  if (!canvasOverlay) return;
  canvasOverlay.style.display = show ? 'block' : 'none';
}

/**
 * Achievement configuration
 */
interface AchievementConfig {
  name: string;
  variable: string;
  type: 'boolean' | 'number';
  threshold?: number; // For number type achievements
}

const achievements: AchievementConfig[] = [
  { name: 'Karl First Fight', variable: 'Achievement_Karl_First_Fight', type: 'boolean' },
  { name: 'Karl Story', variable: 'Achievement_Karl_Story', type: 'boolean' },
  { name: 'Letter', variable: 'Achievement_Letter', type: 'boolean' },
  { name: 'Talk with Waffen SS Soldiers', variable: 'Achievement_waffen_ss', type: 'boolean' },
  { name: 'Red Army', variable: 'Achievement_red_army_count', type: 'number', threshold: 3 },
  { name: 'Aino Story', variable: 'Achievement_Aino_Story_count', type: 'number', threshold: 3 },
  { name: 'Juri Story', variable: 'Achievement_Juri_Story', type: 'boolean' },
  { name: 'Learn Tannenberg', variable: 'Achievement_Learn_Tannenberg', type: 'boolean' },
  { name: 'Learn White Army', variable: 'Achievement_Learn_white_army', type: 'boolean' },
  { name: 'Learn Estonian Riflemen', variable: 'Achievement_Learn_Estonian_Riflemen', type: 'boolean' },
];

/**
 * Check if an achievement is unlocked
 */
function isAchievementUnlocked(config: AchievementConfig): boolean {
  const value = game.getVariable(config.variable);
  
  if (config.type === 'boolean') {
    return value === true;
  } else if (config.type === 'number') {
    const numValue = typeof value === 'number' ? value : 0;
    return numValue >= (config.threshold || 0);
  }
  
  return false;
}

/**
 * Update achievement overlay
 */
function updateAchievements(): void {
  const container = document.getElementById('achievements-container');
  if (!container) return;

  container.innerHTML = '';
  
  achievements.forEach((achievement) => {
    const isUnlocked = isAchievementUnlocked(achievement);
    const achievementElement = document.createElement('div');
    achievementElement.className = `achievement-item p-2 rounded text-center ${
      isUnlocked 
        ? 'bg-yellow-400 text-black opacity-100' 
        : 'bg-gray-800 text-gray-500 opacity-50'
    }`;
    achievementElement.innerHTML = `
      <div class="text-xs font-semibold">${achievement.name}</div>
    `;
    container.appendChild(achievementElement);
  });
}

/**
 * Update UI with current story state
 */
function updateUI(): void {
  const state = game.getCurrentState();

  // Update achievements
  updateAchievements();

  // Update story text
  if (storyTextElement) {
    storyTextElement.textContent = state.text || '';
  }

  // Update character info
  if (characterInfoElement) {
    if (state.characterName || state.speaker) {
      characterInfoElement.innerHTML = `
        <div class="flex justify-between items-center">
          ${state.characterName ? `<span class="font-bold text-primary">${state.characterName}</span>` : ''}
          ${state.speaker ? `<span class="text-sm opacity-70">${state.speaker}</span>` : ''}
        </div>
      `;
    } else {
      characterInfoElement.innerHTML = '';
    }
  }

  // Update avatar
  if (avatarElement) {
    if (state.characterName === 'Karl Tammik') {
      avatarElement.src = avatar_karl;
      avatarElement.classList.remove('hidden');
    } else if (state.characterName === 'Jüri Jõgi') {
      avatarElement.src = avatar_juri;
      avatarElement.classList.remove('hidden');
    } else {
      avatarElement.classList.add('hidden');
    }
  }

  // Update choices
  if (choicesContainer) {
    choicesContainer.innerHTML = '';

    const currentKnot = game.getCurrentKnot();
    const hideTalkChoices = currentKnot === 'Scene_2c_Camp_Doodle';

    state.choices.forEach((choiceText, index) => {
      // When in Scene_2c_Camp_Doodle, hide choices whose text starts with "Talk"
      if (
        hideTalkChoices &&
        choiceText.trim().replace(/^\[|\]$/g, '').startsWith('Talk')
      ) {
        return;
      }

      const button = document.createElement('button');
      button.className =
        'btn btn-block text-left bg-black text-white border-white hover:bg-gray-900 hover:border-gray-200';
      button.textContent = choiceText;
      button.addEventListener('click', () => {
        game.makeChoice(index);

        console.log(game.getCurrentKnot());

        updatePanorama();
        updateUI();
      });
      choicesContainer!.appendChild(button);
    });
  }
}

/**
 * Initialize the application
 */
async function init(): Promise<void> {
  createUIOverlay();

  // Load story first
  try {
    await game.loadStory();
    initPannellum();
    updateUI();

    // Handle story continuation if needed
    if (game.canContinue() && !game.hasChoices()) {
      // Auto-continue if there's text but no choices
      const state = game.getCurrentState();
      if (state.text) {
        updateUI();
      }
    }
  } catch (error) {
    console.error('Failed to initialize game:', error);
    if (storyTextElement) {
      storyTextElement.textContent = 'Failed to load story. Please check the console for details.';
    }
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
