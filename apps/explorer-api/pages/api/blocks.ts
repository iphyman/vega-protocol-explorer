import { VegaClient } from "@vega-scan/sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function blocks(_req: VercelRequest, res: VercelResponse) {
  try {
    const client = new VegaClient();
    const datax = await client.getTransactionByHash(
      "0x5d6ae8bba98cb9e9f936ae560d3242bf6af20f6adf68cf193c79ade0fbb9b3f9"
    );
    const data = datax;
    // 878005 state variable

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: "Your request could not be found" });
  }
}
