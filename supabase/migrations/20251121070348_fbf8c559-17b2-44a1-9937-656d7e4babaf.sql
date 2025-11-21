-- Create storage bucket for voice authentication recordings
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-auth', 'voice-auth', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: Users can upload their own voice authentication files
CREATE POLICY "Users can upload own voice auth files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'voice-auth' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can view their own voice authentication files
CREATE POLICY "Users can view own voice auth files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'voice-auth' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can update their own voice authentication files
CREATE POLICY "Users can update own voice auth files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'voice-auth' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Users can delete their own voice authentication files
CREATE POLICY "Users can delete own voice auth files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'voice-auth' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);