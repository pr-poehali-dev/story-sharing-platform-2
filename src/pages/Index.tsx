import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface Story {
  id: number;
  title: string;
  author: string;
  preview: string;
  content: string;
  date: string;
  category: string;
}

const mockStories: Story[] = [
  {
    id: 1,
    title: "Звездная ночь",
    author: "Анна К.",
    preview: "Когда я впервые увидела звездопад, моя жизнь изменилась навсегда...",
    content: "Когда я впервые увидела звездопад, моя жизнь изменилась навсегда. Это было холодное августовское утро, я сидела на крыше старого дома и смотрела в небо. Каждая падающая звезда несла с собой мечту, надежду на лучшее будущее.",
    date: "15 ноября 2024",
    category: "Личное"
  },
  {
    id: 2,
    title: "Старая фотография",
    author: "Михаил Р.",
    preview: "В старом чемодане я нашел фотографию, которая раскрыла семейную тайну...",
    content: "В старом чемодане я нашел фотографию, которая раскрыла семейную тайну длиною в 50 лет. На черно-белом снимке стояли двое молодых людей, улыбающихся в камеру. Но это были не просто люди - это была история любви, которую все забыли.",
    date: "12 ноября 2024",
    category: "Семейное"
  },
  {
    id: 3,
    title: "Последний поезд",
    author: "Елена М.",
    preview: "Опоздать на последний поезд оказалось лучшим, что могло случиться...",
    content: "Опоздать на последний поезд оказалось лучшим, что могло случиться в тот вечер. Я стояла на пустом перроне, когда ко мне подошел незнакомец с букетом роз. Он сказал, что ждал меня всю жизнь.",
    date: "10 ноября 2024",
    category: "Романтика"
  }
];

export default function Index() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    story: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "История отправлена! ✨",
      description: "Мы прочитаем вашу историю и свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: '', email: '', title: '', story: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <Icon name="BookOpen" size={64} className="text-primary relative z-10" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Книга Историй
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Поделитесь своей историей, и она может стать частью настоящей книги
          </p>
        </header>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">📖 Опубликованные истории</h2>
            <a href="#submit" className="text-primary hover:text-primary/80 transition-colors font-semibold flex items-center gap-2">
              Добавить свою <Icon name="ArrowRight" size={20} />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStories.map((story, index) => (
              <Dialog key={story.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in border-2 hover:border-primary/50" style={{ animationDelay: `${index * 100}ms` }}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-primary to-accent rounded-full text-white">
                          {story.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{story.date}</span>
                      </div>
                      <CardTitle className="text-2xl">{story.title}</CardTitle>
                      <CardDescription className="text-sm">Автор: {story.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{story.preview}</p>
                      <div className="mt-4 flex items-center gap-2 text-primary font-semibold">
                        Читать полностью <Icon name="ChevronRight" size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl mb-2">{story.title}</DialogTitle>
                    <DialogDescription className="text-base">
                      <span className="font-semibold">Автор:</span> {story.author} • {story.date}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    <p className="text-lg leading-relaxed">{story.content}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>

        <section id="submit" className="mb-20 scroll-mt-8">
          <Card className="max-w-3xl mx-auto shadow-2xl border-2 border-primary/20 animate-scale-in">
            <CardHeader className="text-center bg-gradient-to-br from-primary/10 to-accent/10">
              <CardTitle className="text-3xl md:text-4xl mb-2">✍️ Поделитесь своей историей</CardTitle>
              <CardDescription className="text-base">
                Расскажите нам свою уникальную историю, и она может попасть в нашу следующую книгу
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Ваше имя *</Label>
                    <Input
                      id="name"
                      placeholder="Как вас зовут?"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-semibold">Название истории *</Label>
                  <Input
                    id="title"
                    placeholder="Придумайте яркое название"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story" className="text-base font-semibold">Ваша история *</Label>
                  <Textarea
                    id="story"
                    placeholder="Расскажите свою историю... Будьте откровенны, эмоциональны, искренни."
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    required
                    className="min-h-[200px] resize-y"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg h-14 bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 transition-opacity"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить историю
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="mb-20">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://cdn.poehali.dev/projects/6afc0d04-9393-4853-8e46-a005f67a4513/files/e5ed5581-9b79-4164-a13e-7a7771b0ba1f.jpg" 
                  alt="Книга историй" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Icon name="User" size={32} className="text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">Об авторе</h2>
                </div>
                <div className="space-y-4 text-lg">
                  <p className="leading-relaxed">
                    Я собираю настоящие истории людей и превращаю их в книги, которые трогают сердца читателей.
                  </p>
                  <p className="leading-relaxed">
                    Каждая история уникальна и заслуживает быть услышанной. Моя миссия — дать голос тем, чьи истории могут вдохновить других.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Icon name="BookOpen" size={20} />
                      <span>5 изданных книг</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent font-semibold">
                      <Icon name="Users" size={20} />
                      <span>200+ авторов</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary font-semibold">
                      <Icon name="Heart" size={20} />
                      <span>10,000+ читателей</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground">
            © 2024 Книга Историй. Каждая история имеет значение ✨
          </p>
        </footer>
      </div>
    </div>
  );
}
