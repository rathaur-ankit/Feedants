import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius, shadows } from '../theme';
import { contestDetails } from '../data/mockData';

// Custom Components
import { ContestHeader } from '../components/molecules/ContestHeader';
import { CountdownBanner } from '../components/molecules/CountdownBanner';
import { DateItem } from '../components/molecules/DateItem';
import { RewardsTable } from '../components/organisms/RewardsTable';
import { WinnerCarousel } from '../components/organisms/WinnerCarousel';

type Tab = 'about' | 'judging' | 'rules';

export const ContestDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<Tab>('about');

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
          title={contestDetails.title}
          tags={contestDetails.tags}
          certificateNote={contestDetails.certificateNote}
          prizePool={contestDetails.prizePool}
          entryFee={contestDetails.entryFee}
          spotsLeft={contestDetails.spotsLeft}
          totalSpots={contestDetails.totalSpots}
        />

        {/* Judge Card */}
        <View style={styles.judgeCard}>
          <View style={styles.judgeHeader}>
            <View style={styles.judgeAvatarWrapper}>
              <Image source={{ uri: contestDetails.judge.imageUrl }} style={styles.judgeAvatar} />
              <View style={styles.judgeBadge}>
                <Text style={styles.judgeBadgeText}>JUDGE</Text>
              </View>
            </View>
            <View style={styles.judgeInfo}>
              <Text style={styles.judgeName}>{contestDetails.judge.name}</Text>
              <Text style={styles.judgeTitle}>{contestDetails.judge.title}</Text>
              <Text style={styles.judgeExp}>{contestDetails.judge.experience}</Text>
            </View>
          </View>
          <Pressable style={styles.introVideoButton}>
            <Ionicons name="play-circle" size={20} color={colors.primary} />
            <Text style={styles.introVideoText}>Intro Video</Text>
          </Pressable>
        </View>

        {/* Countdown */}
        <CountdownBanner countdown={contestDetails.countdown} />

        {/* Important Dates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Dates</Text>
          <View style={styles.datesGrid}>
            <View style={styles.dateRow}>
              <DateItem icon="calendar" label={contestDetails.dates[0].label} date={contestDetails.dates[0].date} time={contestDetails.dates[0].time} />
              <View style={{ width: spacing.md }} />
              <DateItem icon="navigate" label={contestDetails.dates[1].label} date={contestDetails.dates[1].date} time={contestDetails.dates[1].time} />
            </View>
            <View style={styles.dateRow}>
              <DateItem icon="cloud-upload" label={contestDetails.dates[2].label} date={contestDetails.dates[2].date} time={contestDetails.dates[2].time} />
              <View style={{ width: spacing.md }} />
              <DateItem icon="medal" label={contestDetails.dates[3].label} date={contestDetails.dates[3].date} time={contestDetails.dates[3].time} />
            </View>
          </View>
        </View>

        {/* Previous Winners */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { paddingHorizontal: spacing.xl }]}>Previous Winners</Text>
          <WinnerCarousel winners={contestDetails.previousWinners} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Pressable style={[styles.tab, activeTab === 'about' && styles.activeTab]} onPress={() => setActiveTab('about')}>
            <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
          </Pressable>
          <Pressable style={[styles.tab, activeTab === 'judging' && styles.activeTab]} onPress={() => setActiveTab('judging')}>
            <Text style={[styles.tabText, activeTab === 'judging' && styles.activeTabText]}>Parameters</Text>
          </Pressable>
          <Pressable style={[styles.tab, activeTab === 'rules' && styles.activeTab]} onPress={() => setActiveTab('rules')}>
            <Text style={[styles.tabText, activeTab === 'rules' && styles.activeTabText]}>Rules</Text>
          </Pressable>
        </View>

        {activeTab === 'about' && (
          <View style={styles.tabContent}>
            <Text style={styles.aboutText}>{contestDetails.aboutText}</Text>
            <Pressable>
              <Text style={styles.viewMoreText}>View more</Text>
            </Pressable>
          </View>
        )}

        {/* Rewards Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rewards & Prizes</Text>
          <View style={{ paddingHorizontal: spacing.xl }}>
            <RewardsTable rewards={contestDetails.rewards} />
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Ionicons name="information-circle" size={20} color={colors.onSurfaceVariant} />
          <Text style={styles.disclaimerText}>Note: Prize distribution is subject to terms and conditions.</Text>
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
                value="feedants.com/c/123" 
                editable={false}
              />
              <Ionicons name="copy-outline" size={20} color={colors.primary} />
            </View>
            <Pressable style={styles.referButton}>
              <Text style={styles.referButtonText}>Refer Now</Text>
            </Pressable>
          </View>
        </View>

        {/* Testimonials */}
        <Pressable style={styles.testimonialStrip}>
          <View style={styles.testimonialLeft}>
            <Ionicons name="chatbubbles-outline" size={24} color={colors.primary} />
            <Text style={styles.testimonialText}>Hear From Our Users</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.outlineVariant} />
        </Pressable>
        
        {/* Padding for sticky footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Footer */}
      <View style={styles.stickyFooter}>
        <View style={styles.footerStatus}>
          <Text style={styles.footerStatusText}>Registered</Text>
        </View>
        <Pressable style={styles.submitButton}>
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
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.onSurface,
    marginLeft: spacing.sm,
  },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  langText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  scrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing['6xl'],
  },
  judgeCard: {
    backgroundColor: colors.surfaceContainerLowest,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  judgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  judgeAvatarWrapper: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  judgeAvatar: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.amber500,
  },
  judgeBadge: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    backgroundColor: colors.amber500,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  judgeBadgeText: {
    fontSize: 8,
    fontWeight: typography.weights.bold,
    color: colors.white,
  },
  judgeInfo: {
    flex: 1,
  },
  judgeName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  judgeTitle: {
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    marginVertical: 2,
  },
  judgeExp: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  introVideoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand50,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  introVideoText: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.sm,
  },
  section: {
    marginTop: spacing['3xl'],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
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
    marginTop: spacing['3xl'],
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.sizes.sm,
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
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  viewMoreText: {
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    marginHorizontal: spacing.xl,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing['2xl'],
  },
  disclaimerText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginLeft: spacing.sm,
    flex: 1,
  },
  faqSection: {
    backgroundColor: colors.surfaceContainerLowest,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  faqText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.onSurface,
    fontWeight: typography.weights.medium,
  },
  faqDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
    marginLeft: spacing['5xl'],
  },
  referralCard: {
    backgroundColor: colors.brand100,
    marginHorizontal: spacing.xl,
    marginTop: spacing['2xl'],
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
  },
  referralTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  referralSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  referralAction: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  referralInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  referralInput: {
    flex: 1,
    color: colors.onSurface,
    fontSize: typography.sizes.sm,
  },
  referButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    borderRadius: borderRadius.md,
  },
  referButtonText: {
    color: colors.onPrimary,
    fontWeight: typography.weights.bold,
  },
  testimonialStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  testimonialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialText: {
    marginLeft: spacing.sm,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    ...Platform.select({
      ios: { paddingBottom: spacing['4xl'] },
    }),
  },
  footerStatus: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  footerStatusText: {
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  submitButton: {
    flex: 1,
    marginLeft: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  submitButtonText: {
    color: colors.onPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
});

export default ContestDetailsScreen;
