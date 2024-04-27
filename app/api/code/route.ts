import { NextResponse } from "next/server";
// import aiplatform from '@google-cloud/aiplatform'
import { PredictionServiceClient,helpers } from '@google-cloud/aiplatform'
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const project = "tribal-pillar-421206";
const location = "us-central1";


// Imports the Google Cloud Prediction service client
// const { PredictionServiceClient } = aiplatform.v1;

// Import the helper module for converting arbitrary protobuf.Value objects.
// const { helpers } = aiplatform;

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

    const request = {
      endpoint,
      instances,
      parameters,
    };

    const freeTrial=await checkApiLimit();
    const isPro=await checkSubscription();
    if(!freeTrial && !isPro)
      {
        return new NextResponse("Free Trial has expired",{status:403});
      }
    // Predict request
    const [response] = await predictionServiceClient.predict(request);
    // console.log("Get code generation response");
    const predictions = response.predictions;
    // console.log("\tPredictions :");
    for (const prediction of predictions) {
      // console.log(`\t\tPrediction : ${JSON.stringify(prediction)}`);
    }
    if(!isPro)
    await increaseApiLimit();
    return new NextResponse(predictions[0].content)
  } catch (error) {
    console.log(error)
    return new NextResponse("CODE ERRORS",{status:500});
  }
}
