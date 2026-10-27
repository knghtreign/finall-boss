import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '20mb' }));

// Server-side Google GenAI initialization
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Clinic location details for context
const CLINIC_INFO = {
  name: "Dr. Deepal's Dental Clinic",
  doctor: "Dr. Deepal Shah",
  tagline: "Smarter Smiles, Perfected.",
  location: "Shop No.9, Gate no.2, Empire Guide Building, LD Ruparel Marg, near Priyadarshini Park, Malabar Hill, Mumbai, Maharashtra 400006",
  services: [
    "Smile Roadmap",
    "Dr. Shah's Clear Aligners",
    "Painless Restorations",
    "Transparent Care",
    "Gentle Cleanings",
    "Second Opinion",
    "Direct Crowns",
    "Emergency Visits"
  ],
  workingHours: "Monday - Friday: 11:00 am - 7:00 pm, Saturday: 11:00 am - 4:00 pm, Sunday: Closed",
  phone: "+91 79777 76136 / 022 35767495"
};

// 1. Google Maps Grounding endpoint using gemini-3.8-flash with googleMaps tool
app.post('/api/gemini/maps-grounding', async (req: Request, res: Response) => {
  try {
    const { query, userLocation } = req.body;
    if (!ai) {
      return res.json({
        reply: `Dr. Deepal's Dental Clinic is conveniently accessible with ample street and reserved parking near City Center, Ring Road. Patients visiting from Surat, Mumbai, or Vapi can easily navigate via main transit routes. (Tip: Configure your GEMINI_API_KEY in Secrets for live live-satellite Maps grounding).`,
        groundingChunks: []
      });
    }

    const prompt = `You are the friendly clinic navigator for ${CLINIC_INFO.name} located at ${CLINIC_INFO.location}.
The user is asking: "${query || 'How to reach the clinic and where is parking available?'}"
User's approximate location/context: ${userLocation || 'Gujarat / Western India'}.
Please provide clear directions, transit options, parking details, and landmark guidance.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const candidate = response.candidates?.[0];
    const groundingMetadata = candidate?.groundingMetadata;

    return res.json({
      reply: response.text || 'Dr. Deepal\'s Dental Clinic is easily accessible with street & reserved parking.',
      groundingMetadata: groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Error in maps-grounding:', error);
    return res.json({
      reply: `Dr. Deepal's Dental Clinic is conveniently situated near City Center, Ring Road, Gujarat. There is dedicated ground-level parking with modern wheelchair accessibility. Direct metro & bus stations are within a 5-minute walk.`,
      error: error?.message,
    });
  }
});

// 2. High-Quality Image Generation for AI Smile Makeover Visualizer
// Supports gemini-3-pro-image or gemini-nano-banana-2.1 with 1K, 2K, 4K and aspect ratios
app.post('/api/gemini/generate-smile', async (req: Request, res: Response) => {
  try {
    const {
      prompt,
      aspectRatio = '1:1',
      imageSize = '1K',
      userReferenceImageBase64
    } = req.body;

    if (!ai) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured. Please add your key in Settings > Secrets.',
      });
    }

    // Supported aspect ratios: "1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"
    // Allowed models: gemini-nano-banana-2.1 or gemini-3-pro-image
    const chosenModel = 'gemini-nano-banana-2.1';

    const enhancedPrompt = `Dental aesthetic portrait: A confident, genuine, bright and natural smile simulation with healthy straight white teeth, gentle studio lighting, photorealistic high definition dental aesthetic result: ${prompt || 'Healthy confident natural smile with clear aligners treatment results'}`;

    const parts: any[] = [{ text: enhancedPrompt }];
    if (userReferenceImageBase64) {
      parts.unshift({
        inlineData: {
          data: userReferenceImageBase64.replace(/^data:image\/[a-z]+;base64,/, ''),
          mimeType: 'image/jpeg',
        },
      });
    }

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: imageSize as any,
        },
      },
    });

    let generatedImageUrl = '';
    let responseText = '';

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          responseText += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      return res.status(500).json({
        error: 'No image was returned by the model.',
        text: responseText,
      });
    }

    return res.json({
      imageUrl: generatedImageUrl,
      notes: responseText || 'Smile makeover simulation generated successfully.',
      aspectRatio,
      imageSize,
    });
  } catch (error: any) {
    console.error('Error generating smile image:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate smile simulation.',
    });
  }
});

// 3. High Thinking Consultation / Second Opinion using gemini-4-argon with thinkingLevel: HIGH
app.post('/api/gemini/high-thinking-consultation', async (req: Request, res: Response) => {
  try {
    const { patientIssue, treatmentInterest, budgetConsideration, existingDiagnoses } = req.body;

    if (!ai) {
      return res.json({
        advice: `Based on Dr. Deepal Shah's care philosophy:\n\n1. Initial Assessment: We evaluate dental health holistically before proposing cosmetic or restorative changes.\n2. Minimally Invasive Strategy: If considering clear aligners or restorations, Dr. Shah uses laser diagnostics and 3D digital smile scans to preserve maximum natural tooth structure.\n3. Transparent Estimate: All options (aligners vs veneers vs bonding) are provided with step-by-step pricing before treatment starts.\n\nSchedule your complimentary 3D Smile Scan to receive your personalized roadmap.`,
        thinkingNotes: "Holistic evaluation considering conservative dentistry, occlusion balance, and long-term stability."
      });
    }

    const prompt = `You are Dr. Deepal Shah's Chief Dental Clinical AI Advisor at ${CLINIC_INFO.name}.
Patient details:
- Chief Complaint / Issue: ${patientIssue || 'Considering clear aligners and smile enhancement'}
- Treatment Interest: ${treatmentInterest || 'Clear aligners / Painless restoration'}
- Budget / Timeline: ${budgetConsideration || 'Looking for value-driven, transparent care'}
- Prior Treatments / Notes: ${existingDiagnoses || 'None'}

Clinic philosophy:
- Exclusive 1-on-1 Focus (Dr. Shah manages every aspect directly)
- Total Transparency (clear pricing, treatment paths, and outcomes)
- Advanced, Proven Tech (laser-guided, digital 3D scans, direct crowns)
- Conservative & Painless Dentistry

Provide an empathetic, clinically rigorous, structured analysis:
1. Clinical Assessment & What Dr. Shah will look for during your exam
2. Potential Treatment Paths (Conservative vs Comprehensive)
3. Estimated Duration & What to expect regarding comfort/painlessness
4. Questions to ask during your upcoming visit
5. Value & prevention recommendation to save costs long-term.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    return res.json({
      advice: response.text,
      modelUsed: 'gemini-4-argon',
    });
  } catch (error: any) {
    console.error('Error in high-thinking consultation:', error);
    return res.json({
      advice: `Thank you for sharing your concern. At Dr. Deepal's Dental Clinic, Dr. Shah approaches every smile individually. We recommend taking advantage of our Complimentary 3D Smile Scan offer so Dr. Shah can examine your bite, enamel health, and alignment in person.`,
      error: error?.message,
    });
  }
});

// Clinic appointment storage in-memory for demo / persistence
const appointments: any[] = [];
app.post('/api/appointments', (req: Request, res: Response) => {
  const { name, phone, email, service, preferredDate, preferredTime, notes } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  const newAppointment = {
    id: `DDC-${Date.now().toString().slice(-6)}`,
    name,
    phone,
    email: email || '',
    service: service || 'General Consultation',
    preferredDate: preferredDate || new Date().toISOString().split('T')[0],
    preferredTime: preferredTime || '10:30 AM',
    notes: notes || '',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  return res.json({ success: true, appointment: newAppointment });
});

app.get('/api/appointments', (_req: Request, res: Response) => {
  res.json({ appointments });
});

// Patient intake form submissions
const intakeSubmissions: any[] = [];
app.post('/api/patient-intake', (req: Request, res: Response) => {
  const intakeData = req.body;
  const submission = {
    id: `INTAKE-${Date.now().toString().slice(-6)}`,
    ...intakeData,
    submittedAt: new Date().toISOString(),
  };
  intakeSubmissions.push(submission);
  res.json({ success: true, submission });
});

// Vite middleware in dev or static files in production
async function startServer() {
  // Serve public assets directly to guarantee immediate file resolution
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Dr. Deepal's Dental Clinic server running on http://0.0.0.0:${port}`);
  });
}

startServer();
