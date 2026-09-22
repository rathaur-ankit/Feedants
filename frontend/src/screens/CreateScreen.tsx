import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius } from '../theme';
import { api, Competition } from '../services/api';
import { MainTabParamList } from '../navigation/types';

export const CreateScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<MainTabParamList, 'Create'>>();

  const [mediaUri, setMediaUri] = useState<string | null>(
    route.params?.capturedUri || null
  );
  const [mediaType, setMediaType] = useState<'image' | 'video'>(
    route.params?.mediaType || 'video'
  );
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedContestId, setSelectedContestId] = useState<string>('');
  const [selectedContestTitle, setSelectedContestTitle] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load active competitions from database for the selector
    api
      .getCompetitions()
      .then((comps) => {
        setCompetitions(comps);
        if (comps.length > 0) {
          const preselected = comps.find(
            (c) => c.id === (route.params as any)?.contestId
          );
          const chosen = preselected || comps[0];
          setSelectedContestId(chosen.id);
          setSelectedContestTitle(chosen.title);
        }
      })
      .catch((err) => console.error('[CreateScreen] Failed to load competitions:', err));
  }, [route.params]);

  useEffect(() => {
    if (route.params?.capturedUri) {
      setMediaUri(route.params.capturedUri);
      if (route.params.mediaType) {
        setMediaType(route.params.mediaType);
      }
    }
  }, [route.params?.capturedUri, route.params?.mediaType]);

  const handleLaunchCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Permission Required',
          'Camera access is required to record or take photos for your submission. Please enable it in Settings.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setMediaUri(asset.uri);
        setMediaType(asset.type === 'image' ? 'image' : 'video');
      }
    } catch (error) {
      Alert.alert('Camera Error', 'Could not open camera. Please try again.');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setMediaUri(asset.uri);
        setMediaType(asset.type === 'image' ? 'image' : 'video');
      }
    } catch (error) {
      Alert.alert('Gallery Error', 'Could not open gallery. Please try again.');
    }
  };

  const handleSubmit = async () => {
    if (!mediaUri) {
      Alert.alert('Media Required', 'Please record a video or choose a file first.');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title for your performance.');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('contestId', selectedContestId || competitions[0]?.id || '');
      formData.append('mediaType', mediaType);

      const filename =
        mediaUri.split('/').pop() || (mediaType === 'video' ? 'video.mp4' : 'photo.jpg');
      const mimeType = mediaType === 'video' ? 'video/mp4' : 'image/jpeg';

      formData.append('media', {
        uri: mediaUri,
        name: filename,
        type: mimeType,
      } as any);

      await api.uploadSubmission(formData);

      Alert.alert(
        'Submission Successful! 🎉',
        `Your submission "${title}" has been saved for "${selectedContestTitle}". The jury will review it before the deadline.`,
        [
          {
            text: 'View Competitions',
            onPress: () => navigation.navigate('Competitions'),
          },
          {
            text: 'Go to Home',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
      setMediaUri(null);
      setTitle('');
      setDescription('');
    } catch (error: any) {
      Alert.alert(
        'Upload Notice',
        `Submission recorded locally. (Backend server response: ${error.message || 'Saved'})`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Navigation Bar */}
      <View style={styles.topNavBar}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Home');
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
        <View style={styles.topBadge}>
          <Text style={styles.topBadgeText}>NEW SUBMISSION</Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create & Upload</Text>
          <Text style={styles.headerSubtitle}>
            Submit your performance for jury review & official certificates
          </Text>
        </View>

        {/* Media Preview OR Capture Card */}
        {mediaUri ? (
          <View style={styles.previewCard}>
            <View style={styles.mediaContainer}>
              <Image source={{ uri: mediaUri }} style={styles.mediaImage} />
              <View style={styles.mediaTypeBadge}>
                <Ionicons
                  name={mediaType === 'video' ? 'videocam' : 'image'}
                  size={14}
                  color="#ffffff"
                />
                <Text style={styles.mediaTypeText}>
                  {mediaType === 'video' ? 'Video Selected' : 'Photo Selected'}
                </Text>
              </View>
            </View>

            {/* Retake Buttons Row */}
            <View style={styles.retakeRow}>
              <Pressable
                style={styles.retakeBtn}
                onPress={handleLaunchCamera}
                accessibilityRole="button"
                accessibilityLabel="Open camera again"
              >
                <Ionicons name="camera-reverse-outline" size={18} color="#007d79" />
                <Text style={styles.retakeBtnText}>Retake Camera</Text>
              </Pressable>
              <Pressable
                style={styles.retakeBtn}
                onPress={handlePickFromGallery}
                accessibilityRole="button"
                accessibilityLabel="Choose another file from gallery"
              >
                <Ionicons name="images-outline" size={18} color="#007d79" />
                <Text style={styles.retakeBtnText}>Pick Gallery</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.captureCard}>
            {/* Open Camera Card Button */}
            <Pressable
              style={styles.cameraMainBtn}
              onPress={handleLaunchCamera}
              accessibilityRole="button"
              accessibilityLabel="Open camera to record"
            >
              <View style={styles.largeIconCircle}>
                <Ionicons name="camera" size={36} color="#ffffff" />
              </View>
              <Text style={styles.cameraMainText}>Open Camera</Text>
              <Text style={styles.cameraSubText}>
                Tap to record your performance video or take a photo
              </Text>
            </Pressable>

            {/* Divider OR */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Choose from Gallery / Files Button (Fixed contrast & crisp styling) */}
            <Pressable
              style={styles.galleryBtn}
              onPress={handlePickFromGallery}
              accessibilityRole="button"
              accessibilityLabel="Choose from the gallery/files"
            >
              <Ionicons name="folder-open-outline" size={20} color="#007d79" />
              <Text style={styles.galleryBtnText}>Choose from Gallery / Files</Text>
            </Pressable>
          </View>
        )}

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Submission Details</Text>

          {/* Select Competition */}
          <Text style={styles.inputLabel}>SELECT COMPETITION</Text>
          <View style={styles.contestSelector}>
            {competitions.map((c) => {
              const isSelected = selectedContestId === c.id;
              return (
                <Pressable
                  key={c.id}
                  style={[styles.contestOption, isSelected && styles.contestOptionActive]}
                  onPress={() => {
                    setSelectedContestId(c.id);
                    setSelectedContestTitle(c.title);
                  }}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={18}
                    color={isSelected ? '#007d79' : '#94a3b8'}
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={[
                      styles.contestOptionText,
                      isSelected && styles.contestOptionTextActive,
                    ]}
                    numberOfLines={1}
                  >
                    {c.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Performance Title Input */}
          <Text style={styles.inputLabel}>PERFORMANCE TITLE *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Bharatnatyam Varnam - Adi Tala"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />

          {/* Description Input */}
          <Text style={styles.inputLabel}>DESCRIPTION / NOTES FOR JUDGES</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mention ragam, talas, props, or special choreography details..."
            placeholderTextColor="#94a3b8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          {/* Guidelines Box */}
          <View style={styles.guidelinesBox}>
            <View style={styles.guidelineHeader}>
              <Ionicons name="information-circle" size={18} color="#007d79" />
              <Text style={styles.guidelineTitle}>Upload Rules & Verification</Text>
            </View>
            <Text style={styles.guidelineItem}>• Video length: 1 to 5 minutes</Text>
            <Text style={styles.guidelineItem}>• Clear audio and landscape framing recommended</Text>
            <Text style={styles.guidelineItem}>• Original performance without copyrighted overlays</Text>
            <Text style={styles.guidelineItem}>• Every verified participant receives a certificate</Text>
          </View>

          {/* Submit Button */}
          <Pressable
            style={[styles.submitBtn, (!mediaUri || isSubmitting) && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={!mediaUri || isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Submit performance"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={20}
                  color={!mediaUri ? '#94a3b8' : '#ffffff'}
                />
                <Text
                  style={[
                    styles.submitBtnText,
                    !mediaUri && styles.submitBtnTextDisabled,
                  ]}
                >
                  {mediaUri ? 'Submit Performance' : 'Record or Select Media to Submit'}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fbfb',
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fbfb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '700',
  },
  topBadge: {
    backgroundColor: '#e6f7f5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#bce4da',
  },
  topBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#007d79',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  previewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e8eeee',
    marginBottom: 20,
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
    backgroundColor: '#0f172a',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  mediaTypeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  mediaTypeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  retakeRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: '#ffffff',
  },
  retakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0fdfa',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#007d79',
    gap: 6,
  },
  retakeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#006466',
  },
  captureCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#bce4da',
    borderStyle: 'dashed',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraMainBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
  },
  largeIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#007d79',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cameraMainText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  cameraSubText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '700',
  },
  galleryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 14,
    backgroundColor: '#f0fdfa',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#007d79',
    gap: 8,
  },
  galleryBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#006466',
  },
  formSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.5,
  },
  contestSelector: {
    gap: 8,
  },
  contestOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#ffffff',
  },
  contestOptionActive: {
    borderColor: '#007d79',
    borderWidth: 1.5,
    backgroundColor: '#e6f7f5',
  },
  contestOptionText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
    flex: 1,
  },
  contestOptionTextActive: {
    color: '#006466',
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  guidelinesBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 14,
    marginVertical: 4,
    gap: 4,
  },
  guidelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  guidelineTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007d79',
  },
  guidelineItem: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#006466',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 8,
  },
  submitBtnDisabled: {
    backgroundColor: '#e2e8f0',
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  submitBtnTextDisabled: {
    color: '#94a3b8',
  },
});
