import { useState, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CourseLikeCommentProps {
  courseId: string;
  courseName: string;
}

interface Comment {
  id: string;
  comment_text: string;
  created_at: string;
}

export const CourseLikeComment = ({ courseId, courseName }: CourseLikeCommentProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchLikeStatus();
    fetchLikeCount();
    fetchComments();
  }, [courseId]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user?.id || null);
  };

  const fetchLikeStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("course_likes")
      .select()
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    setIsLiked(!!data);
  };

  const fetchLikeCount = async () => {
    const { count } = await supabase
      .from("course_likes")
      .select("*", { count: "exact", head: true })
      .eq("course_id", courseId);

    setLikeCount(count || 0);
  };

  const fetchComments = async () => {
    const { data, count } = await supabase
      .from("course_comments")
      .select("*", { count: "exact" })
      .eq("course_id", courseId)
      .order("created_at", { ascending: false });

    setComments(data || []);
    setCommentCount(count || 0);
  };

  const handleLike = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like courses",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isLiked) {
        await supabase
          .from("course_likes")
          .delete()
          .eq("user_id", userId)
          .eq("course_id", courseId);
        
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        await supabase
          .from("course_likes")
          .insert({ user_id: userId, course_id: courseId });
        
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: newComment, error } = await supabase
        .from("course_comments")
        .insert({
          user_id: userId,
          course_id: courseId,
          comment_text: commentText.trim(),
        })
        .select()
        .single();

      if (error) throw error;

      // Add the new comment to the list immediately
      if (newComment) {
        setComments(prev => [newComment, ...prev]);
        setCommentCount(prev => prev + 1);
      }

      toast({
        title: "Success",
        description: "Comment posted successfully",
      });

      setCommentText("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 ml-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className="flex items-center gap-1 hover:bg-white/10"
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
          />
          <span className="text-xs text-white">{likeCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCommentDialog(true)}
          className="flex items-center gap-1 hover:bg-white/10"
        >
          <Share2 className="h-4 w-4 text-white" />
          <span className="text-xs text-white">{commentCount}</span>
        </Button>
      </div>

      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comments for {courseName}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Textarea
                placeholder="Write your comment... (Press Enter to submit)"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleComment();
                  }
                }}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Press Enter to submit, Shift+Enter for new line
                </p>
                <Button
                  onClick={handleComment}
                  size="sm"
                >
                  Post Comment
                </Button>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-3">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3 bg-muted rounded-lg"
                  >
                    <p className="text-sm">{comment.comment_text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
