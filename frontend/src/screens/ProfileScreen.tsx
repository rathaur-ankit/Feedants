import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../theme';
import { userData, profileCompetitions, profileMenuItems, profileFilters, trustBadges } from '../data/mockData';

// Custom Components
import { ProfileHeader } from '../components/molecules/ProfileHeader';
import { StatItem } from '../components/molecules/StatItem';
import { SettingsMenuItem } from '../components/molecules/SettingsMenuItem';
import { WalletCard } from '../components/organisms/WalletCard';
import { AchievementCard } from '../components/organisms/AchievementCard';
import { CompetitionListCard } from '../components/organisms/CompetitionListCard';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProfileHeader title="My Profile" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
              <Pressable style={styles.editAvatarBtn} accessibilityRole="button" accessibilityLabel="Edit photo">
                <Ionicons name="camera" size={14} color={colors.onPrimary} />
              </Pressable>
            </View>
            <View style={styles.userDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{userData.name}</Text>
                {userData.isVerified && (
                  <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.username}>{userData.username}</Text>
              
              <View style={styles.tagsRow}>
                {userData.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <StatItem label="Contests" value={userData.stats.contestsJoined} />
            <View style={styles.statDivider} />
            <StatItem label="Podiums Won" value={userData.stats.podiumsWon} />
            <View style={styles.statDivider} />
            <StatItem label="Earnings" value={userData.stats.totalEarnings} />
          </View>
        </View>

        {/* Wallet Banner */}
        <WalletCard balance={userData.wallet.balance} />

        {/* My Competitions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Competitions</Text>
            <Pressable
              onPress={() => navigation.navigate('Competitions')}
              accessibilityRole="button"
              accessibilityLabel="Manage all competitions"
            >
              <Text style={styles.manageText}>Manage (7)</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersList}>
            {profileFilters.map((filter) => (
              <Pressable 
                key={filter.id} 
                style={[styles.filterPill, filter.isActive && styles.filterPillActive]}
              >
                <Text style={[styles.filterText, filter.isActive && styles.filterTextActive]}>
                  {filter.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.competitionsList}>
            {profileCompetitions.map((comp) => (
              <CompetitionListCard
                key={comp.id}
                title={comp.title}
                category={comp.category}
                status={comp.status}
                deadline={comp.deadline}
                imageUrl={comp.imageUrl}
                slot={'slot' in comp ? comp.slot : undefined}
                onPress={() => navigation.navigate('ContestDetails', { contestId: comp.id })}
                onUploadPress={() => navigation.navigate('ContestDetails', { contestId: comp.id })}
              />
            ))}
          </View>
        </View>

        {/* Achievements & Certificates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleRow}>
              <Ionicons name="medal" size={20} color={colors.amber500} />
              <Text style={styles.sectionTitleWithIcon}>Achievements & Certificates</Text>
            </View>
            <Text style={styles.verifiedCountText}>3 Verified</Text>
          </View>
          
          <AchievementCard 
            title="State Classical Dance 2025" 
            description="1st Place Winner" 
            date="2025" 
          />
        </View>

        {/* Referral Banner */}
        <Pressable style={styles.referralBanner}>
          <View style={styles.referralIconContainer}>
            <Ionicons name="megaphone" size={24} color={colors.primary} />
          </View>
          <View style={styles.referralTextContainer}>
            <Text style={styles.referralTitle}>Invite Friends & Earn</Text>
            <Text style={styles.referralSubtitle}>Get ₹50 for every friend who joins a contest.</Text>
          </View>
          <View style={styles.inviteBtn}>
            <Text style={styles.inviteBtnText}>Invite</Text>
          </View>
        </Pressable>

        {/* Settings Menu List */}
        <View style={styles.settingsMenu}>
          {profileMenuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <SettingsMenuItem
                icon={item.icon as any}
                label={item.label}
                subtitle={'subtitle' in item ? item.subtitle : undefined}
                value={'value' in item ? item.value : undefined}
                badge={'badge' in item ? item.badge : undefined}
              />
              {index < profileMenuItems.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout from account</Text>
        </Pressable>

        {/* Trust Footer */}
        <View style={styles.trustFooter}>
          <Ionicons name="lock-closed" size={14} color={colors.onSurfaceVariant} />
          <Text style={styles.trustFooterText}>Secured by Feedants</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing['4xl'],
  },
  userCard: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.surfaceContainerHigh,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
  },
  username: {
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 10,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.surfaceContainerHigh,
  },
  section: {
    marginTop: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  manageText: {
    fontSize: typography.sizes.sm,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  filtersList: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  filterPillActive: {
    backgroundColor: colors.onSurface,
    borderColor: colors.onSurface,
  },
  filterText: {
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  filterTextActive: {
    color: colors.surfaceContainerLowest,
  },
  competitionsList: {
    paddingHorizontal: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitleWithIcon: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  verifiedCountText: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  referralBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand50,
    marginHorizontal: spacing.xl,
    marginTop: spacing['2xl'],
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.brand100,
  },
  referralIconContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  referralTextContainer: {
    flex: 1,
  },
  referralTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  referralSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  inviteBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  inviteBtnText: {
    color: colors.onPrimary,
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
  settingsMenu: {
    marginTop: spacing['2xl'],
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.xl,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
    marginLeft: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorContainer,
    marginHorizontal: spacing.xl,
    marginTop: spacing['2xl'],
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  logoutText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
    color: colors.error,
  },
  trustFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    gap: spacing.xs,
  },
  trustFooterText: {
    fontSize: typography.sizes.xs,
    color: colors.onSurfaceVariant,
  },
});

export default ProfileScreen;
