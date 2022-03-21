import { VegaClient } from "@vega-scan/sdk";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function blocks(_req: VercelRequest, res: VercelResponse) {
  try {
    const client = new VegaClient();
    const data = await client.getBlock(511793);
    // const data = decoded.map((val, index) => ({
    //   index,
    //   type: val.type,
    //   value: val.value,
    // }));

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: "Your request could not be found" });
  }
}
