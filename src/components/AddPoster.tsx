import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AddPoster() {
  const [posters, setPosters] = useState<Array<{ id: string; url: string; file: File }>>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPoster = () => {
    if (previewUrl) {
      const newPoster = {
        id: Date.now().toString(),
        url: previewUrl,
        file: new File([], "poster.jpg")
      };
      setPosters([...posters, newPoster]);
      setPreviewUrl("");
      toast.success("Poster added successfully!");
    }
  };

  const handleDeletePoster = (id: string) => {
    setPosters(posters.filter(p => p.id !== id));
    toast.success("Poster deleted!");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>Add Poster</h1>
        <p className="text-muted-foreground">Upload and manage promotional posters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload New Poster</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label 
                htmlFor="poster" 
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-input-background"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <span className="text-muted-foreground mb-2">Click to upload poster</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                  </div>
                )}
              </label>
              <input
                id="poster"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <Button 
              onClick={handleAddPoster} 
              disabled={!previewUrl}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Add Poster
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Current Posters ({posters.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {posters.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {posters.map((poster) => (
                  <div key={poster.id} className="relative group">
                    <div className="border border-border rounded-lg overflow-hidden">
                      <img 
                        src={poster.url} 
                        alt="Poster" 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeletePoster(poster.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-4 opacity-50" />
                <p>No posters uploaded yet</p>
                <p className="text-sm mt-1">Upload your first poster to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}