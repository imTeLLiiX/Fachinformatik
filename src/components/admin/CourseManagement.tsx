'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    duration: 0
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Kurse konnten nicht geladen werden',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Fehler beim Erstellen des Kurses');

      toast({
        title: 'Erfolg',
        description: 'Kurs wurde erfolgreich erstellt'
      });

      setFormData({ title: '', description: '', level: '', duration: 0 });
      fetchCourses();
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Kurs konnte nicht erstellt werden',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Möchten Sie diesen Kurs wirklich löschen?')) return;

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Fehler beim Löschen des Kurses');

      toast({
        title: 'Erfolg',
        description: 'Kurs wurde erfolgreich gelöscht'
      });

      fetchCourses();
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Kurs konnte nicht gelöscht werden',
        variant: 'destructive'
      });
    }
  };

  if (loading) return <div>Laden...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Neuen Kurs erstellen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="level">Level</Label>
            <Input
              id="level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Dauer (in Minuten)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
              required
            />
          </div>
          <Button type="submit">Kurs erstellen</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Kurse verwalten</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                  <div className="mt-2 space-x-4">
                    <span>Level: {course.level}</span>
                    <span>Dauer: {course.duration} Minuten</span>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = `/admin/courses/${course.id}/modules`}
                  >
                    Module verwalten
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(course.id)}
                  >
                    Löschen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
} 