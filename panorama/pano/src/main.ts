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

  // Get initial panorama URL based on current KNOT
  const currentKnot = game.getCurrentKnot();
  const panoramaUrl = getPanoramaUrl(currentKnot);

  // Use a placeholder if no panorama URL is found
  const defaultPanorama = panoramaUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWExYTFhO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMDAiIGhlaWdodD0iNTAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PHRleHQgeD0iNTAwIiB5PSIyNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Tm8gUGFub3JhbWEgSW1hZ2U8L3RleHQ+PC9zdmc+';

  viewer = window.pannellum.viewer(container, {
    type: 'equirectangular',
    panorama: defaultPanorama,
    autoLoad: true,
    autoRotate: 0,
    showControls: true,
    keyboardZoom: true,
    mouseZoom: true,
  });
}

/**
 * Get panorama URL for a given KNOT name
 */
function getPanoramaUrl(knotName: string | null): string | null {
  if (!knotName) return null;
  return imageMapping[knotName] || null;
}

/**
 * Update panorama image based on current KNOT
 */
function updatePanorama(): void {
  if (!viewer) return;

  const currentKnot = game.getCurrentKnot();
  const panoramaUrl = getPanoramaUrl(currentKnot);

  if (panoramaUrl) {
    try {
      viewer.loadScene('current', {
        type: 'equirectangular',
        panorama: panoramaUrl,
      });
    } catch (error) {
      console.error('Failed to load panorama:', error);
    }
  }
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
        updatePanorama();
        
        // Continue story if there's more text
        while (game.canContinue() && !game.hasChoices()) {
          // Story continues automatically
        }
        
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
