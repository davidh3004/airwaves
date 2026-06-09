import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAdminContent,
  useGetMe,
  useLogin,
  useLogout,
  useUpdateContent,
  getGetAdminContentQueryKey,
  getGetMeQueryKey,
  getGetContentQueryKey,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Wrench, 
  Star, 
  ShieldCheck, 
  HelpCircle, 
  MapPin, 
  Phone, 
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
  MoveUp,
  MoveDown
} from "lucide-react";

export default function Admin() {
  const queryClient = useQueryClient();
  const { data: me, isLoading: loadingMe } = useGetMe();
  const { data: content, isLoading: loadingContent } = useGetAdminContent();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const updateMutation = useUpdateContent();

  const [password, setPassword] = useState("");

  if (loadingMe || (me?.authenticated && loadingContent)) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!me?.authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F7FB]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0A2A6E]">Admin Login</CardTitle>
            <CardDescription>Enter your password to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginMutation.mutate(
                  { data: { password } },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
                      toast.success("Logged in successfully");
                    },
                    onError: () => {
                      toast.error("Invalid password");
                    },
                  }
                );
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#00AEEF] hover:bg-[#00AEEF]/90" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSave = (key: string, value: any) => {
    updateMutation.mutate(
      { data: { key, value } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetAdminContentQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetContentQueryKey() });
          toast.success("Changes saved successfully");
        },
        onError: () => {
          toast.error("Failed to save changes");
        },
      }
    );
  };

  const handleLogout = () => {
    logoutMutation.mutate(
      undefined as any,
      {
        onSuccess: () => {
          queryClient.setQueryData(getGetMeQueryKey(), { authenticated: false });
          toast.success("Logged out");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A2A6E] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#00AEEF]" />
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {/* We'll use the TabsTrigger in the main content area, but we can make it look like a sidebar */}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10 gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Tabs defaultValue="hero" className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#0A2A6E]">Dashboard</h2>
            <TabsList className="bg-white border">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero">
            <HeroEditor content={content?.hero} onSave={(val) => handleSave("hero", val)} />
          </TabsContent>
          <TabsContent value="services">
            <ServicesEditor content={content?.services || []} onSave={(val) => handleSave("services", val)} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsEditor content={content?.reviews || []} onSave={(val) => handleSave("reviews", val)} />
          </TabsContent>
          <TabsContent value="plans">
            <PlansEditor content={content?.maintenancePlans || []} onSave={(val) => handleSave("maintenancePlans", val)} />
          </TabsContent>
          <TabsContent value="faq">
            <FaqEditor content={content?.faq || []} onSave={(val) => handleSave("faq", val)} />
          </TabsContent>
          <TabsContent value="contact">
            <ContactEditor content={content?.contact || {}} onSave={(val) => handleSave("contact", val)} />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryEditor content={content?.gallery || []} onSave={(val) => handleSave("gallery", val)} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function HeroEditor({ content, onSave }: { content: any; onSave: (val: any) => void }) {
  const [val, setVal] = useState(content);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tagline</Label>
          <Input value={val.tag} onChange={(e) => setVal({ ...val, tag: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Headline</Label>
          <Textarea value={val.headline} onChange={(e) => setVal({ ...val, headline: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Subheadline</Label>
          <Textarea value={val.subheadline} onChange={(e) => setVal({ ...val, subheadline: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Estimate CTA</Label>
            <Input value={val.ctaEstimate} onChange={(e) => setVal({ ...val, ctaEstimate: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Emergency CTA</Label>
            <Input value={val.ctaEmergency} onChange={(e) => setVal({ ...val, ctaEmergency: e.target.value })} />
          </div>
        </div>
        <Button onClick={() => onSave(val)} className="bg-[#00AEEF]">Save Changes</Button>
      </CardContent>
    </Card>
  );
}

function ServicesEditor({ content, onSave }: { content: any[]; onSave: (val: any) => void }) {
  const [items, setItems] = useState([...content]);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Service {index + 1}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, i) => i !== index))}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={item.title} onChange={(e) => updateItem(index, "title", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={item.description} onChange={(e) => updateItem(index, "description", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Icon Name (Lucide)</Label>
                <Input value={item.icon} onChange={(e) => updateItem(index, "icon", e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.highlight}
                  onChange={(e) => updateItem(index, "highlight", e.target.checked)}
                />
                <Label>Highlight</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => setItems([...items, { title: "", description: "", icon: "Wrench" }])} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Service
        </Button>
        <Button onClick={() => onSave(items)} className="bg-[#00AEEF]">Save All Services</Button>
      </div>
    </div>
  );
}

function ReviewsEditor({ content, onSave }: { content: any[]; onSave: (val: any) => void }) {
  const [items, setItems] = useState([...content]);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Review {index + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, i) => i !== index))}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={item.name} onChange={(e) => updateItem(index, "name", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={item.location} onChange={(e) => updateItem(index, "location", e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Text</Label>
              <Textarea value={item.text} onChange={(e) => updateItem(index, "text", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input type="number" min="1" max="5" value={item.rating} onChange={(e) => updateItem(index, "rating", parseInt(e.target.value))} />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button onClick={() => setItems([...items, { name: "", location: "", text: "", rating: 5 }])} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Review
        </Button>
        <Button onClick={() => onSave(items)} className="bg-[#00AEEF]">Save All Reviews</Button>
      </div>
    </div>
  );
}

function PlansEditor({ content, onSave }: { content: any[]; onSave: (val: any) => void }) {
  const [items, setItems] = useState([...content]);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((plan, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Plan {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={plan.name} onChange={(e) => updateItem(index, "name", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input value={plan.price} onChange={(e) => updateItem(index, "price", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Input value={plan.period} onChange={(e) => updateItem(index, "period", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={plan.description} onChange={(e) => updateItem(index, "description", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Features (one per line)</Label>
                <Textarea 
                  value={plan.features.join("\n")} 
                  onChange={(e) => updateItem(index, "features", e.target.value.split("\n"))} 
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={plan.highlight}
                  onChange={(e) => updateItem(index, "highlight", e.target.checked)}
                />
                <Label>Recommended</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={() => onSave(items)} className="bg-[#00AEEF]">Save Plans</Button>
    </div>
  );
}

function FaqEditor({ content, onSave }: { content: any[]; onSave: (val: any) => void }) {
  const [items, setItems] = useState([...content]);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQ {index + 1}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, i) => i !== index))}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Input value={item.question} onChange={(e) => updateItem(index, "question", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Answer</Label>
              <Textarea value={item.answer} onChange={(e) => updateItem(index, "answer", e.target.value)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button onClick={() => setItems([...items, { question: "", answer: "" }])} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
        <Button onClick={() => onSave(items)} className="bg-[#00AEEF]">Save FAQ</Button>
      </div>
    </div>
  );
}

function ContactEditor({ content, onSave }: { content: any; onSave: (val: any) => void }) {
  const [val, setVal] = useState(content);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone 1 (Main)</Label>
            <Input value={val.phone1} onChange={(e) => setVal({ ...val, phone1: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Phone 2</Label>
            <Input value={val.phone2} onChange={(e) => setVal({ ...val, phone2: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Input value={val.address} onChange={(e) => setVal({ ...val, address: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input value={val.website} onChange={(e) => setVal({ ...val, website: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>License Number</Label>
          <Input value={val.license} onChange={(e) => setVal({ ...val, license: e.target.value })} />
        </div>
        <Button onClick={() => onSave(val)} className="bg-[#00AEEF]">Save Contact Info</Button>
      </CardContent>
    </Card>
  );
}

function GalleryEditor({ content, onSave }: { content: any[]; onSave: (val: any) => void }) {
  const [items, setItems] = useState([...content]);

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Image {index + 1}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setItems(items.filter((_, i) => i !== index))}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100 border">
                {item.src ? (
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={item.src} onChange={(e) => updateItem(index, "src", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Alt Text</Label>
                <Input value={item.alt} onChange={(e) => updateItem(index, "alt", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={item.label} onChange={(e) => updateItem(index, "label", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-4">
        <Button onClick={() => setItems([...items, { src: "", alt: "", label: "" }])} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" /> Add Image
        </Button>
        <Button onClick={() => onSave(items)} className="bg-[#00AEEF]">Save Gallery</Button>
      </div>
    </div>
  );
}
