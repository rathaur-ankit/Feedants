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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { activeRegistration, competitions } from '../data/mockData';
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
  const [selectedContest, setSelectedContest] = useState<string>(activeRegistration.title);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          'Camera access is required to record or take photos for your submission.'
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

  const handleSubmit = () => {
    if (!mediaUri) {
      Alert.alert('Media Required', 'Please record or select a video/photo first.');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title for your performance.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Submission Successful! 🎉',
        `Your submission "${title}" has been uploaded to "${selectedContest}". The jury will review it before the deadline.`,
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
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>NEW SUBMISSION</Text>
            <Text style={styles.headerTitle}>Create & Upload</Text>
          </View>
          <View style={styles.cameraIconWrap}>
            <Ionicons name="camera" size={24} color={colors.primary} />
          </View>
        </View>

        {/* Media Preview or Capture Options */}
        {mediaUri ? (
          <View style={styles.previewCard}>
            <View style={styles.mediaContainer}>
              <Image source={{ uri: mediaUri }} style={styles.mediaImage} />
              <View style={styles.mediaTypeBadge}>
                <Ionicons
                  name={mediaType === 'video' ? 'videocam' : 'image'}
                  size={14}
                  color={colors.onPrimary}
                />
                <Text style={styles.mediaTypeText}>
                  {mediaType === 'video' ? 'Video Recorded' : 'Photo Captured'}
                </Text>
              </View>
            </View>

            <View style={styles.retakeRow}>
              <Pressable
                style={styles.retakeBtn}
                onPress={handleLaunchCamera}
                accessibilityRole="button"
                accessibilityLabel="Record again"
              >
                <Ionicons name="camera-reverse" size={18} color={colors.primary} />
                <Text style={styles.retakeBtnText}>Retake Camera</Text>
              </Pressable>
              <Pressable
                style={styles.retakeBtn}
                onPress={handlePickFromGallery}
                accessibilityRole="button"
                accessibilityLabel="Choose another from gallery"
              >
                <Ionicons name="images" size={18} color={colors.primary} />
                <Text style={styles.retakeBtnText}>Pick Gallery</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.captureCard}>
            <Pressable
              style={styles.cameraMainBtn}
              onPress={handleLaunchCamera}
              accessibilityRole="button"
              accessibilityLabel="Open camera to record"
            >
              <View style={styles.largeIconCircle}>
                <Ionicons name="camera" size={36} color={colors.onPrimary} />
              </View>
              <Text style={styles.cameraMainText}>Open Camera</Text>
              <Text style={styles.cameraSubText}>
                Record your performance video or take a photo
              </Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              style={styles.galleryBtn}
              onPress={handlePickFromGallery}
              accessibilityRole="button"
              accessibilityLabel="Upload from gallery"
            >
              <Ionicons name="folder-open-outline" size={20} color={colors.primary} />
              <Text style={styles.galleryBtnText}>Choose from Gallery / Files</Text>
            </Pressable>
          </View>
        )}

        {/* Submission Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Submission Details</Text>

          {/* Contest Selector */}
          <Text style={styles.inputLabel}>Select Competition</Text>
          <View style={styles.contestSelector}>
            <Pressable
              style={[
                styles.contestOption,
                selectedContest === activeRegistration.title && styles.contestOptionActive,
              ]}
              onPress={() => setSelectedContest(activeRegistration.title)}
            >
              <Text
                style={[
                  styles.contestOptionText,
                  selectedContest === activeRegistration.title && styles.contestOptionTextActive,
                ]}
              >
                {activeRegistration.title} (Registered)
              </Text>
            </Pressable>
            {competitions.slice(0, 2).map((c) => (
              <Pressable
                key={c.id}
                style={[
                  styles.contestOption,
                  selectedContest === c.title && styles.contestOptionActive,
                ]}
                onPress={() => setSelectedContest(c.title)}
              >
                <Text
                  style={[
                    styles.contestOptionText,
                    selectedContest === c.title && styles.contestOptionTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {c.title}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Title Input */}
          <Text style={styles.inputLabel}>Performance Title *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Kathak Classical Tarana in Teentaal"
            placeholderTextColor={colors.onSurfaceVariant}
            value={title}
            onChangeText={setTitle}
          />

          {/* Description Input */}
          <Text style={styles.inputLabel}>Description & Credits (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Mention ragas, choreography, accompanists, or instruments..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          {/* Submit Button */}
          <Pressable
            style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Submit performance"
          >
            <Ionicons name="cloud-upload" size={20} color={colors.onPrimary} />
            <Text style={styles.submitBtnText}>
              {isSubmitting ? 'Uploading Submission...' : 'Submit Performance'}
            </Text>
          </Pressable>
        </View>

        {/* Guidelines */}
        <View style={styles.guidelinesCard}>
          <View style={styles.guidelineHeader}>
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <Text style={styles.guidelineTitle}>Submission Guidelines</Text>
          </View>
          <Text style={styles.guidelineItem}>• Ensure adequate lighting and clear acoustic sound.</Text>
          <Text style={styles.guidelineItem}>• Solo and duet entries must follow contest rules.</Text>
          <Text style={styles.guidelineItem}>• Adjudication begins immediately after the submission deadline.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: spacing['6xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  headerSubtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  cameraIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.brand50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.brand200,
  },
  captureCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    ...shadows.sm,
  },
  cameraMainBtn: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    width: '100%',
  },
  largeIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  cameraMainText: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  cameraSubText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  orText: {
    marginHorizontal: spacing.md,
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.bold,
  },
  galleryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand50,
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.brand200,
    gap: spacing.sm,
  },
  galleryBtnText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  previewCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    ...shadows.sm,
  },
  mediaContainer: {
    width: '100%',
    height: 220,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceContainerHigh,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaTypeBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  mediaTypeText: {
    fontSize: typography.sizes.xs,
    color: colors.onPrimary,
    fontWeight: typography.weights.medium,
  },
  retakeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  retakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  retakeBtnText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  formSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  contestSelector: {
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  contestOption: {
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  contestOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.brand50,
  },
  contestOptionText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  contestOptionTextActive: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  textInput: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    marginTop: spacing.xl,
    gap: spacing.sm,
    ...shadows.md,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  guidelinesCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  guidelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  guidelineTitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  guidelineItem: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 4,
  },
});

export default CreateScreen;
