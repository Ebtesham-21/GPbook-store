import mongoose, { Schema, Document } from 'mongoose';

interface ISlider extends Document {
  imageUrl: string;
  title: string;
  description: string;
}

const SliderSchema = new Schema<ISlider>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Slider || mongoose.model<ISlider>('Slider', SliderSchema);
