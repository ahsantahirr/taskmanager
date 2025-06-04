
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Database, Settings } from 'lucide-react';

export const FirebaseSetupGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
          Firebase Setup Guide
        </h1>
        <p className="text-gray-600">Complete guide to set up Firebase for your CRUD application</p>
      </div>

      <Alert className="border-orange-200 bg-orange-50">
        <Database className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> You need to complete this Firebase setup before the app will work properly.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Step 1: Create Firebase Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to <a href="https://console.firebase.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
            <li>Click "Create a project" or "Add project"</li>
            <li>Enter your project name (e.g., "my-task-manager")</li>
            <li>Choose whether to enable Google Analytics (optional)</li>
            <li>Click "Create project"</li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Step 2: Set up Firestore Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>In your Firebase project dashboard, click "Firestore Database"</li>
            <li>Click "Create database"</li>
            <li>Choose "Start in test mode" (for development)</li>
            <li>Select a location closest to your users</li>
            <li>Click "Done"</li>
          </ol>
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertDescription>
              <strong>Security Rules:</strong> Test mode allows read/write access for 30 days. 
              Update security rules for production use.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Step 3: Get Configuration Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>In your Firebase project, click the gear icon → "Project settings"</li>
            <li>Scroll down to "Your apps" section</li>
            <li>Click the web icon (&lt;/&gt;) to add a web app</li>
            <li>Enter an app nickname (e.g., "Task Manager Web")</li>
            <li>Click "Register app"</li>
            <li>Copy the configuration object</li>
          </ol>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Your config will look like this:</p>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd..."
};`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Step 4: Update Configuration File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open <code className="bg-gray-100 px-1 rounded">src/config/firebase.ts</code> in your project</li>
            <li>Replace the placeholder values with your actual Firebase configuration</li>
            <li>Save the file</li>
          </ol>
          
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              After updating the configuration, your app should connect to Firebase automatically!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 5: Test Your Setup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Save all files and ensure your development server is running</li>
            <li>Try creating a new task in the application</li>
            <li>Check your Firestore database in the Firebase Console</li>
            <li>You should see a new "tasks" collection with your data</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Production Security Rules</h3>
          <p className="text-sm text-gray-600 mb-3">
            For production, update your Firestore security rules:
          </p>
          <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{document} {
      allow read, write: if request.auth != null;
    }
  }
}`}
          </pre>
          <p className="text-xs text-gray-500 mt-2">
            This requires authentication. Add Firebase Auth if needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
