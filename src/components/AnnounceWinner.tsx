import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Upload, Trophy } from "lucide-react";
import { toast } from "sonner";

export function AnnounceWinner() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Winner announcement posted successfully!");
    setFormData({ title: "", description: "", image: null });
    setImagePreview("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Announce Winner</h1>
        <p className="text-muted-foreground">Post winner announcements and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Winner Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="image">Upload Image</Label>
                <div className="mt-2">
                  <label 
                    htmlFor="image" 
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-input-background"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full object-contain rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload image</span>
                      </div>
                    )}
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Congratulations to our Top Performer!"
                  required
                  className="bg-input-background"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter announcement details..."
                  rows={6}
                  required
                  className="bg-input-background resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Trophy className="mr-2 h-4 w-4" />
                Post Announcement
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg p-4 space-y-4 bg-muted/30">
              {imagePreview ? (
                <div className="w-full h-48 rounded-lg overflow-hidden bg-background">
                  <img src={imagePreview} alt="Winner" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-48 rounded-lg bg-background flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Image preview will appear here</p>
                  </div>
                </div>
              )}

              <div>
                {formData.title ? (
                  <h3 className="text-primary">{formData.title}</h3>
                ) : (
                  <h3 className="text-muted-foreground">Announcement Title</h3>
                )}
              </div>

              <div>
                {formData.description ? (
                  <p className="text-sm">{formData.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Announcement description will appear here. Add a description to see the preview.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm">Admin</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}