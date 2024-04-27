import { NextResponse } from "next/server";
import { PredictionServiceClient, helpers } from '@google-cloud/aiplatform';
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const project = "tribal-pillar-421206";
const location = "us-central1";

// Specifies the location of the api endpoint
const clientOptions = {
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
};
const publisher = "google";
const model = "code-bison@001";

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body.body;
    const endpoint = `projects/${project}/locations/${location}/publishers/${publisher}/models/${model}`;

    // Prepare the instance and parameters
    const prompt = {
      prefix: message,
    };
    const instanceValue = helpers.toValue(prompt);
    const instances = [instanceValue];

    const parameter = {
      temperature: 0.5,
      maxOutputTokens: 256,
    };
    const parameters = helpers.toValue(parameter);

    // Construct the request object
    const request = {
      endpoint: endpoint,
      instances: instances,
      parameters: parameters,
    };

    // Check API usage limits and subscription status
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired", { status: 403 });
    }

    // Make the prediction request
    const [response] = await predictionServiceClient.predict(request);
    const predictions = response.predictions;

    // Manage API limits for non-pro users
    if (!isPro) {
      await increaseApiLimit();
    }

    // Return the prediction content
    return new NextResponse(JSON.stringify(predictions[0].content));
  } catch (error) {
    console.error("Error during prediction:", error.message);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
