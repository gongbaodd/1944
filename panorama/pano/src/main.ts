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

// Initialize game
const game = new GameEngine();

// Pannellum viewer instance
let viewer: any = null;

// UI elements
let storyOverlay: HTMLElement | null = null;
let storyTextElement: HTMLElement | null = null;
let characterInfoElement: HTMLElement | null = null;
let choicesContainer: HTMLElement | null = null;

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
  Object.entries(imageMapping).forEach(([knot, url]) => {
    scenes[knot] = {
      type: 'equirectangular',
      panorama: url,
      autoLoad: true,
    };
  });

  viewer = window.pannellum.viewer(container, {
    type: 'equirectangular',
    autoLoad: true,
    autoRotate: 0,
    showControls: false,
    keyboardZoom: true,
    mouseZoom: true,
    scenes: scenes,
  });

  updatePanorama();
}

/**
 * Update panorama image based on current KNOT
 */
function updatePanorama(): void {
  if (!viewer) return;

  const currentKnot = game.getCurrentKnot();

  viewer.loadScene(currentKnot);
  console.log(viewer.getConfig());
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

  // Create story overlay
  storyOverlay = document.createElement('div');
  storyOverlay.className = 'story-overlay p-6';
  storyOverlay.innerHTML = `
    <div class="card bg-base-100 bg-opacity-90 shadow-xl max-w-4xl mx-auto">
      <div class="card-body">
        <div id="character-info" class="mb-2"></div>
        <div id="story-text" class="text-lg mb-4 min-h-[4rem]"></div>
        <div id="choices-container" class="flex flex-col gap-2"></div>
      </div>
    </div>
  `;
  app.appendChild(storyOverlay);

  // Get references to UI elements
  storyTextElement = document.getElementById('story-text');
  characterInfoElement = document.getElementById('character-info');
  choicesContainer = document.getElementById('choices-container');
}

/**
 * Update UI with current story state
 */
function updateUI(): void {
  const state = game.getCurrentState();

  // Update story text
  if (storyTextElement) {
    storyTextElement.textContent = state.text || '';
  }

  // Update character info
  if (characterInfoElement) {
    const parts: string[] = [];
    if (state.characterName) {
      parts.push(`<span class="font-bold text-primary">${state.characterName}</span>`);
    }
    if (state.speaker) {
      parts.push(`<span class="text-sm opacity-70">${state.speaker}</span>`);
    }
    characterInfoElement.innerHTML = parts.length > 0 ? parts.join(' - ') : '';
  }

  // Update choices
  if (choicesContainer) {
    choicesContainer.innerHTML = '';
    state.choices.forEach((choiceText, index) => {
      const button = document.createElement('button');
      button.className = 'btn btn-primary btn-block text-left';
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
