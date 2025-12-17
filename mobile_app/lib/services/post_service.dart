import 'package:supabase_flutter/supabase_flutter.dart';
import '../models/post_model.dart';
import 'tag_service.dart';

class PostService {
  final SupabaseClient _supabase = Supabase.instance.client;
  final TagService _tagService = TagService();

  // Create a new post
  Future<PostModel> createPost({
    required String userId,
    required String title,
    required String description,
    required String location,
    required String tagId,
  }) async {
    try {
      final response = await _supabase
          .from('posts')
          .insert({
            'user_id': userId,
            'title': title,
            'description': description,
            'location': location,
            'tag_id': tagId,
            'likes': 0,
            'created_at': DateTime.now().toIso8601String(),
          })
          .select()
          .single();

      return PostModel.fromJson(response);
    } catch (e) {
      print('Error creating post: $e');
      rethrow;
    }
  }

  // Get all posts with user details and tags
  Future<List<PostModel>> getAllPosts() async {
    try {
      final response = await _supabase
          .from('posts')
          .select('''
            *, 
            users!inner(display_name, photo_url),
            tags(*)
          ''')
          .order('created_at', ascending: false);

      return (response as List).map((post) {
        final userData = post['users'];
        return PostModel.fromJson({
          ...post,
          'user_display_name': userData['display_name'],
          'user_photo_url': userData['photo_url'],
        });
      }).toList();
    } catch (e) {
      print('Error getting posts: $e');
      return [];
    }
  }

  // Get posts by user
  Future<List<PostModel>> getUserPosts(String userId) async {
    try {
      final response = await _supabase
          .from('posts')
          .select('''
            *, 
            users!inner(display_name, photo_url),
            tags(*)
          ''')
          .eq('user_id', userId)
          .order('created_at', ascending: false);

      return (response as List).map((post) {
        final userData = post['users'];
        return PostModel.fromJson({
          ...post,
          'user_display_name': userData['display_name'],
          'user_photo_url': userData['photo_url'],
        });
      }).toList();
    } catch (e) {
      print('Error getting user posts: $e');
      return [];
    }
  }

  // Get a single post
  Future<PostModel?> getPost(String postId) async {
    try {
      final response = await _supabase
          .from('posts')
          .select('''
            *, 
            users!inner(display_name, photo_url),
            tags(*)
          ''')
          .eq('id', postId)
          .single();

      final userData = response['users'];
      return PostModel.fromJson({
        ...response,
        'user_display_name': userData['display_name'],
        'user_photo_url': userData['photo_url'],
      });
    } catch (e) {
      print('Error getting post: $e');
      return null;
    }
  }

  // Update post
  Future<PostModel> updatePost({
    required String postId,
    String? title,
    String? description,
    String? location,
    String? tagId,
  }) async {
    try {
      final updateData = <String, dynamic>{
        'updated_at': DateTime.now().toIso8601String(),
      };

      if (title != null) updateData['title'] = title;
      if (description != null) updateData['description'] = description;
      if (location != null) updateData['location'] = location;
      if (tagId != null) updateData['tag_id'] = tagId;

      final response = await _supabase
          .from('posts')
          .update(updateData)
          .eq('id', postId)
          .select()
          .single();

      return PostModel.fromJson(response);
    } catch (e) {
      print('Error updating post: $e');
      rethrow;
    }
  }

  // Delete post
  Future<void> deletePost(String postId) async {
    try {
      await _supabase.from('posts').delete().eq('id', postId);
    } catch (e) {
      print('Error deleting post: $e');
      rethrow;
    }
  }

  // Like post
  Future<void> likePost(String postId) async {
    try {
      await _supabase.rpc('increment_likes', params: {'post_id': postId});
    } catch (e) {
      print('Error liking post: $e');
      rethrow;
    }
  }
}
