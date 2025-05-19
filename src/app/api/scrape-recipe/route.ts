import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 });

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $('h1').first().text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const servings = $('span:contains("servings")').first().text().trim();
    const totalTime = $('span:contains("Total Time")').first().text().trim();

    const ingredients: string[] = [];
    $('li:contains("cup"), li:contains("tsp"), li:contains("tbsp")').each((_, el) => {
      ingredients.push($(el).text().trim());
    });

    const steps: string[] = [];
    $('li:contains("Step")').each((_, el) => {
      steps.push($(el).text().trim());
    });

    return NextResponse.json({
      title,
      description,
      servings,
      totalTime,
      ingredients,
      steps,
    });

  } catch (err) {
    console.error('Scraping error:', err);
    return NextResponse.json({ error: 'Failed to scrape the recipe.' }, { status: 500 });
  }
}
