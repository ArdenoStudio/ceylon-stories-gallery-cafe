import { KeyRotator } from './KeyRotator';
import { HeadlessExporter } from './HeadlessExporter';
import { supabaseAdmin } from '../lib/supabase/client';

export interface CarouselSlide {
  title: string;
  description: string;
  image_prompt: string;
  style: string;
}

/**
 * Priority 19: Carousel Engine (§5)
 * §5 Carousel Orchestrator: Multi-slide visual content generation.
 */
export class CarouselOrchestrator {
  private rotator = new KeyRotator();

  /**
   * Generates a structural plan for a 5-10 slide carousel.
   */
  public async planCarousel(topic: string, count: number = 7): Promise<CarouselSlide[]> {
    console.log(`[Carousel] Planning ${count} slides for topic: ${topic}...`);

    const response = await this.rotator.execute({
      taskType: 'creative',
      payload: {
        system: `You are the Ardeno Content Director. 
                 Plan a high-engagement carousel.
                 Provide a JSON list of slides with title, description and image_prompt (Stable Diffusion format).`,
        user: `TOPIC: ${topic}\nSLIDE_COUNT: ${count}`
      }
    });

    try {
      return JSON.parse(response.text) as CarouselSlide[];
    } catch (e) {
      console.error('[Carousel] Failed to parse carousel plan.');
      return [];
    }
  }

  /**
   * Triggers the visual rendering of a slide.
   */
  public async renderSlide(slide: CarouselSlide): Promise<string> {
     console.log(`[Carousel] Rendering slide: ${slide.title}...`);
     
     // 1. Generate the slide UUID and save its config to DB so the render route can read it
     const slideId = `slide_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
     await supabaseAdmin.from('carousel_slides').insert({
       id: slideId,
       title: slide.title,
       description: slide.description,
       style: slide.style,
       background_image_prompt: slide.image_prompt
     });

     // 2. Export via Headless browser logic
     const exporter = new HeadlessExporter();
     const url = await exporter.exportSlide(slideId);
     
     return url;
  }
}
