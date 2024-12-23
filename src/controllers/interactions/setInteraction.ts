import { Interaction } from "../../models/interactionModel";

export async function setInteraction(req: any, res: any) {
    const { userId, productId, type, score } = req.body;

  try {
    const interaction = new Interaction({ userId, productId, type, score });
    await interaction.save();

    res.status(201).json({ message: 'Interaction logged successfully' });
  } catch (error) {
    console.error('Error logging interaction:', error);
    res.status(500).json({ error: 'Failed to log interaction' });
  }

};