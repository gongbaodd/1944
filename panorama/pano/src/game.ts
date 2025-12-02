import { Story } from 'inkjs';

export interface StoryState {
  text: string;
  choices: string[];
  speaker: string | null;
  characterName: string | null;
  currentKnot: string | null;
}

export class GameEngine {
  private story: Story | null = null;
  private currentKnot: string | null = null;
  private initialized: boolean = false;

  constructor() {
    // Story will be loaded asynchronously
  }

  /**
   * Load the story from scenario.json
   */
  async loadStory(): Promise<void> {
    if (this.initialized) return;

    try {
      const response = await fetch('/scenario.json');
      const scenarioJson = await response.json();
      this.story = new Story(scenarioJson);
      this.updateCurrentKnot();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to load story:', error);
      throw error;
    }
  }

  /**
   * Get the current story state including text, choices, and metadata
   */
  getCurrentState(): StoryState {
    if (!this.story) {
      return {
        text: 'Loading story...',
        choices: [],
        speaker: null,
        characterName: null,
        currentKnot: null,
      };
    }

    const text = this.getCurrentText();
    const choices = this.getChoices();
    const speaker = this.getVariable('speaker') as string | null;
    const characterName = this.getVariable('character_name') as string | null;

    return {
      text,
      choices,
      speaker,
      characterName,
      currentKnot: this.currentKnot,
    };
  }

  /**
   * Get the current story text
   */
  getCurrentText(): string {
    if (!this.story) return '';
    let text = '';
    while (this.story.canContinue) {
      text += this.story.Continue();
    }
    return text.trim();
  }

  /**
   * Get available choices
   */
  getChoices(): string[] {
    if (!this.story) return [];
    return this.story.currentChoices.map((choice) => choice.text);
  }

  /**
   * Make a choice by index
   */
  makeChoice(index: number): void {
    if (!this.story) return;
    if (index >= 0 && index < this.story.currentChoices.length) {
      this.story.ChooseChoiceIndex(index);
      this.updateCurrentKnot();
    }
  }

  /**
   * Check if the story can continue
   */
  canContinue(): boolean {
    return this.story?.canContinue ?? false;
  }

  /**
   * Check if there are choices available
   */
  hasChoices(): boolean {
    return (this.story?.currentChoices.length ?? 0) > 0;
  }

  /**
   * Get the current KNOT name
   */
  getCurrentKnot(): string | null {
    return this.currentKnot;
  }

  /**
   * Get a story variable value
   */
  getVariable(name: string): unknown {
    if (!this.story) return null;
    try {
      return this.story.variablesState[name];
    } catch {
      return null;
    }
  }

  /**
   * Update the current KNOT by examining the story state
   */
  private updateCurrentKnot(): void {
    if (!this.story) return;
    // Try to get the current path which contains the knot name
    const path = this.story.state.currentPathString;
    if (path) {
      // Extract knot name from path (format: "knotName.stitchName" or just "knotName")
      const parts = path.split('.');
      this.currentKnot = parts[0] || null;
    } else {
      // Fallback: try to detect from story content or use a default
      this.currentKnot = null;
    }
  }

  /**
   * Check if story has ended
   */
  hasEnded(): boolean {
    if (!this.story) return false;
    return !this.story.canContinue && this.story.currentChoices.length === 0;
  }
}

