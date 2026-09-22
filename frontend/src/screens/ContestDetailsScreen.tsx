import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { api, Competition } from '../services/api';

// Custom Components
import { ContestHeader } from '../components/molecules/ContestHeader';
import { CountdownBanner } from '../components/molecules/CountdownBanner';
import { DateItem } from '../components/molecules/DateItem';
import { RewardsTable } from '../components/organisms/RewardsTable';
import { WinnerCarousel } from '../components/organisms/WinnerCarousel';

type Tab = 'about' | 'judging' | 'rules';

export const ContestDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const contestId = route.params?.contestId;

  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const loadContest = useCallback(async () => {
    try {
      setLoading(true);
      let data: Competition;
      if (contestId) {
        data = await api.getCompetitionById(contestId);
      } else {
        const comps = await api.getCompetitions();
        data = comps[0];
      }
      setCompetition(data);
    } catch (error) {
      console.error('[ContestDetailsScreen] Failed to fetch contest from database:', error);
    } finally {
      setLoading(false);
    }
  }, [contestId]);

  useEffect(() => {
    loadContest();
  }, [loadContest]);

  const handleJoin = async () => {
    if (!competition) return;
    try {
      setIsJoining(true);
      await api.joinCompetition(competition.id);
      Alert.alert(
        'Registration Confirmed! 🎉',
        `You have successfully registered for "${competition.title}". Prepare your performance and upload before the deadline.`,
        [
          {
            text: 'Upload Now',
            onPress: () =>
              navigation.navigate('MainTabs', {
                screen: 'Create',
                params: { capturedUri: undefined },
              }),
          },
          { text: 'OK', onPress: () => loadContest() },
        ]
      );
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Could not register for contest.');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Fetching contest details from database...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!competition) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Contest not found in database.</Text>
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const judge = competition.judge || {
    name: 'Jury Board',
    title: 'Adjudicator',
    experience: '10+ Years',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4QbGoeX6pKPC72-szD4GUaZbyOiHro4IRFThC-RuvsM4cmKlQzCkMa5oD9nNIKzTjmzw-jeY6Vj61okf6mSK0kEK97-S095lvbDeqVmW11slqOmrQD35g5Zf95MJGOj-S9-gdbQivA7WzaePQnBdMJVtIYgO1imHxrudx0LJ6xAP3597wwn-n8CKdoq1o_6pUHUFb89fQZJJWMn4ZrStv-ybdvPjAWEYLhJTImEzTX_h_ST0n8kH',
  };

  const dates = competition.dates && competition.dates.length >= 4 ? competition.dates : [
    { label: 'Register Before', date: '10 Aug 26', time: '11:50 PM' },
    { label: 'Submission Starts', date: '6 Aug 26', time: '04:00 AM' },
    { label: 'Submission Ends', date: '30 Aug 26', time: '11:55 PM' },
    { label: 'Result Date', date: '1 Sept 26', time: '11:50 PM' },
  ];

  const winners = competition.previousWinners && competition.previousWinners.length > 0 ? competition.previousWinners : [
    { name: 'Riya Shah', position: '1st Winner', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2MiHo15SPOSpQIlZmL0_VaS06RyEVX8fUGrf9d8oI61Dg0jF9ICIyzGVSsXYomczZnS1IS9SQ9RmAt9MfuttmvX7tsz6FuA_HiKkAGHKG3fSBMkUeaZyyEIKOF_SP8v5KLukg7beUwswxB7xR754JWipaic26v_X2_SbDwDsSnakp6XMEcWf9G7szXWPT8emSS_2QuKQ4SUHobxKhrQqaZmeVrI7xGfB4nMK_xcOCQyh2y794KqD1' },
  ];

  const rewards = competition.rewards && competition.rewards.length > 0 ? competition.rewards : [
    { position: '1st Winner', emoji: '🏆', amount: '₹ 550' },
    { position: '2nd Winner', emoji: '🥈', amount: '₹ 300' },
    { position: '3rd Winner', emoji: '🥉', amount: '₹ 240' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Navbar */}
      <View style={styles.navBar}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          <Text style={styles.backText}>Go back</Text>
        </Pressable>
        <View style={styles.langPill}>
          <Text style={styles.langText}>ENG / Hindi</Text>
          <Ionicons name="chevron-down" size={16} color={colors.onSurfaceVariant} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Contest Header */}
        <ContestHeader
          title={competition.title}
          tags={competition.tags?.map((t: any) => (typeof t === 'string' ? t : t.label)) || []}
          certificateNote={competition.certificateNote || 'Winners get certificate'}
          prizePool={competition.prizePool}
          entryFee={competition.entryFee}
          spotsLeft={competition.spotsLeft}
          totalSpots={competition.totalSpots}
        />

        {/* Judge Card */}
        <View style={styles.judgeCard}>
          <View style={styles.judgeHeader}>
            <View style={styles.judgeAvatarWrapper}>
              <Image source={{ uri: judge.avatarUrl }} style={styles.judgeAvatar} />
              <View style={styles.judgeBadge}>
                <Text style={styles.judgeBadgeText}>JUDGE</Text>
              </View>
            </View>
            <View style={styles.judgeInfo}>
              <Text style={styles.judgeName}>{judge.name}</Text>
              <Text style={styles.judgeTitle}>{judge.title || judge.role}</Text>
              <Text style={styles.judgeExp}>{judge.experience || '10+ Years of Experience'}</Text>
            </View>
          </View>
          <Pressable style={styles.introVideoButton}>
            <Ionicons name="play-circle" size={20} color={colors.primary} />
            <Text style={styles.introVideoText}>Intro Video</Text>
          </Pressable>
        </View>

        {/* Countdown */}
        <CountdownBanner countdown={competition.countdown || '01d : 06h : 28m : 32s'} />

        {/* Important Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Dates</Text>
          <View style={styles.datesGrid}>
            <View style={styles.dateRow}>
              <DateItem
                icon="calendar"
                label={dates[0]?.label || 'Register Before'}
                date={dates[0]?.date || ''}
                time={dates[0]?.time || ''}
              />
              <View style={{ width: spacing.md }} />
              <DateItem
                icon="navigate"
                label={dates[1]?.label || 'Submission Starts'}
                date={dates[1]?.date || ''}
                time={dates[1]?.time || ''}
              />
            </View>
            <View style={styles.dateRow}>
              <DateItem
                icon="cloud-upload"
                label={dates[2]?.label || 'Submission Ends'}
                date={dates[2]?.date || ''}
                time={dates[2]?.time || ''}
              />
              <View style={{ width: spacing.md }} />
              <DateItem
                icon="medal"
                label={dates[3]?.label || 'Result Date'}
                date={dates[3]?.date || ''}
                time={dates[3]?.time || ''}
              />
            </View>
          </View>
        </View>

        {/* Previous Winners */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.xl }]}>
            Previous Winners
          </Text>
          <WinnerCarousel winners={winners} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
              About
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'judging' && styles.activeTab]}
            onPress={() => setActiveTab('judging')}
          >
            <Text style={[styles.tabText, activeTab === 'judging' && styles.activeTabText]}>
              Parameters
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'rules' && styles.activeTab]}
            onPress={() => setActiveTab('rules')}
          >
            <Text style={[styles.tabText, activeTab === 'rules' && styles.activeTabText]}>
              Rules
            </Text>
          </Pressable>
        </View>

        {activeTab === 'about' && (
          <View style={styles.tabContent}>
            <Text style={styles.aboutText}>{competition.aboutText}</Text>
          </View>
        )}

        {activeTab === 'rules' && (
          <View style={styles.tabContent}>
            {competition.rules?.map((rule, idx) => (
              <Text key={idx} style={styles.ruleItem}>
                • {rule}
              </Text>
            ))}
          </View>
        )}

        {activeTab === 'judging' && (
          <View style={styles.tabContent}>
            <Text style={styles.aboutText}>
              Submissions are judged on Technique (40%), Rhythm & Expression (30%), and Audience Engagement (30%).
            </Text>
          </View>
        )}

        {/* Rewards Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards & Prizes</Text>
          <View style={{ paddingHorizontal: spacing.xl }}>
            <RewardsTable rewards={rewards} />
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Ionicons name="information-circle" size={20} color={colors.onSurfaceVariant} />
          <Text style={styles.disclaimerText}>
            Note: Prize distribution is subject to terms and conditions.
          </Text>
        </View>

        {/* FAQ Row */}
        <View style={styles.faqSection}>
          <Pressable style={styles.faqItem}>
            <Ionicons name="play-circle-outline" size={24} color={colors.primary} />
            <Text style={styles.faqText}>How will you receive prize money?</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.outlineVariant} />
          </Pressable>
          <View style={styles.faqDivider} />
          <Pressable style={styles.faqItem}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
            <Text style={styles.faqText}>Refund policy & Razorpay trust</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.outlineVariant} />
          </Pressable>
        </View>

        {/* Referral Card */}
        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>Refer & Earn</Text>
          <Text style={styles.referralSubtitle}>Invite friends to this contest and earn rewards!</Text>
          <View style={styles.referralAction}>
            <View style={styles.referralInputContainer}>
              <TextInput
                style={styles.referralInput}
                value={`feedants.com/c/${competition.id}`}
                editable={false}
              />
              <Ionicons name="copy-outline" size={20} color={colors.primary} />
            </View>
            <Pressable style={styles.referButton}>
              <Text style={styles.referButtonText}>Refer Now</Text>
            </Pressable>
          </View>
        </View>

        {/* Padding for sticky footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
        <Pressable
          style={[styles.joinBtn, isJoining && { opacity: 0.7 }]}
          onPress={handleJoin}
          disabled={isJoining || competition.spotsLeft <= 0}
        >
          <Text style={styles.joinBtnText}>
            {isJoining
              ? 'Registering...'
              : competition.spotsLeft <= 0
              ? 'Contest Full'
              : `Join for ${competition.entryFee}`}
          </Text>
        </Pressable>

        <Pressable
          style={styles.submitButton}
          onPress={() =>
            navigation.navigate('MainTabs', {
              screen: 'Create',
              params: { capturedUri: undefined },
            })
          }
        >
          <Ionicons name="cloud-upload-outline" size={20} color={colors.onPrimary} />
          <Text style={styles.submitButtonText}>Upload Submission</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    fontFamily: typography.fontFamily,
  },
  errorText: {
    fontSize: typography.sizes.md,
    color: colors.error,
    marginBottom: spacing.md,
  },
  backBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  backBtnText: {
    color: colors.onPrimary,
    fontWeight: typography.weights.bold,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurface,
    fontWeight: typography.weights.medium,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  langText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  scrollContent: {
    paddingBottom: spacing['6xl'],
  },
  judgeCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  judgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  judgeAvatarWrapper: {
    position: 'relative',
  },
  judgeAvatar: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHighest,
  },
  judgeBadge: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    transform: [{ translateX: -18 }],
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  judgeBadgeText: {
    color: colors.onPrimary,
    fontSize: 8,
    fontWeight: typography.weights.bold,
  },
  judgeInfo: {
    flex: 1,
  },
  judgeName: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  judgeTitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  judgeExp: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  introVideoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.full,
  },
  introVideoText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  datesGrid: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  dateRow: {
    flexDirection: 'row',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  tab: {
    paddingVertical: spacing.md,
    marginRight: spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: typography.weights.bold,
  },
  tabContent: {
    padding: spacing.xl,
  },
  aboutText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  ruleItem: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.md,
  },
  disclaimerText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  faqSection: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  faqText: {
    flex: 1,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
    color: colors.onSurface,
  },
  faqDivider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
  },
  referralCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.lg,
  },
  referralTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  referralSubtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  referralAction: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  referralInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  referralInput: {
    flex: 1,
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurface,
    paddingVertical: spacing.sm,
  },
  referButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  referButtonText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.lg,
  },
  joinBtn: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  joinBtnText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  submitButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
});
