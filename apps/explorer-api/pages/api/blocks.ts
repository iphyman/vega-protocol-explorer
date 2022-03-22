import { VegaClient } from "@vega-scan/sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function blocks(_req: VercelRequest, res: VercelResponse) {
  try {
    const client = new VegaClient();
    const datax = await client.getBlock(892517);
    const data = datax.transactions[0]
    // 878005 state variable

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: "Your request could not be found" });
  }
}
