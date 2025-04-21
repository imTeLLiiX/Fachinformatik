'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Einfache Syntax-Highlighting-Funktion
const highlightSyntax = (code: string, language: string): string => {
  // Hier könnte eine richtige Syntax-Highlighting-Bibliothek wie Prism.js oder highlight.js verwendet werden
  // Für dieses Beispiel verwenden wir eine einfache Implementierung
  
  if (language === 'html') {
    return code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/(&lt;\/?[a-z0-9]+)/gi, '<span class="text-blue-500">$1</span>')
      .replace(/(&gt;)/g, '<span class="text-blue-500">$1</span>')
      .replace(/(&quot;[^&]*&quot;)/g, '<span class="text-green-500">$1</span>');
  } else if (language === 'css') {
    return code
      .replace(/([a-z0-9-]+):/gi, '<span class="text-blue-500">$1:</span>')
      .replace(/({[^}]*})/g, '<span class="text-purple-500">$1</span>');
  } else if (language === 'javascript') {
    return code
      .replace(/(function|const|let|var|if|else|for|while|return)/g, '<span class="text-blue-500">$1</span>')
      .replace(/(["'].*?["'])/g, '<span class="text-green-500">$1</span>');
  }
  
  return code;
};

export default function CodeEditorPage() {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('html');
  const [output, setOutput] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Beispielcode für verschiedene Sprachen
  const exampleCode = {
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Meine Webseite</title>
  <style>
    body { font-family: Arial; }
  </style>
</head>
<body>
  <h1>Willkommen</h1>
  <p>Dies ist ein Beispiel.</p>
</body>
</html>`,
    css: `/* Grundlegende Stile */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}`,
    javascript: `// Beispiel JavaScript-Code
function greet(name) {
  return \`Hallo, \${name}!\`;
}

// Event-Listener für Button-Klicks
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('greet-button');
  if (button) {
    button.addEventListener('click', () => {
      const name = prompt('Wie heißt du?');
      if (name) {
        alert(greet(name));
      }
    });
  }
});`
  };

  // Setze den Beispielcode beim Laden der Seite
  useEffect(() => {
    setCode(exampleCode[language as keyof typeof exampleCode]);
  }, [language]);

  // Aktualisiere die Vorschau, wenn sich der Code ändert
  useEffect(() => {
    if (language === 'html') {
      setOutput(code);
    } else if (language === 'css') {
      // Für CSS zeigen wir nur den Code an, da wir keine Live-Vorschau implementieren
      setOutput(`<style>${code}</style>`);
    } else if (language === 'javascript') {
      // Für JavaScript zeigen wir nur den Code an, da wir keine Live-Vorschau implementieren
      setOutput(`<script>${code}</script>`);
    }
  }, [code, language]);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Editor</h1>
          <p className="text-gray-600">
            Bearbeite Code und sieh die Ergebnisse in Echtzeit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Editor</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={isPreviewMode ? "outline" : "default"} 
                    onClick={togglePreviewMode}
                    size="sm"
                  >
                    {isPreviewMode ? "Editor anzeigen" : "Vorschau anzeigen"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {!isPreviewMode ? (
                <>
                  <Tabs defaultValue={language} onValueChange={handleLanguageChange} className="mb-4">
                    <TabsList>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="css">CSS</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="border rounded-md overflow-hidden">
                    <textarea
                      className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-white focus:outline-none"
                      value={code}
                      onChange={handleCodeChange}
                      spellCheck="false"
                    />
                  </div>
                </>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <div 
                    className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-white overflow-auto"
                    dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vorschau</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden bg-white h-96">
                <iframe
                  srcDoc={output}
                  className="w-full h-full"
                  title="Vorschau"
                  sandbox="allow-scripts"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 