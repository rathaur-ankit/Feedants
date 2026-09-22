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
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { api, Competition } from '../services/api';

// Custom Components
import { ContestHeader } from '../components/molecules/ContestHeader';
import { CountdownBanner } from '../components/molecules/CountdownBanner';
import { DateItem } from '../components/molecules/DateItem';
import { RewardsTable } from '../components/organisms/RewardsTable';
import { WinnerCarousel } from '../components/organisms/WinnerCarousel';

type Tab = 'about' | 'judging' | 'rules';
type Language = 'ENG' | 'HI';

export const ContestDetailsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const contestId = route.params?.contestId;

  const [language, setLanguage] = useState<Language>('ENG');
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isJoining, setIsJoining] = useState(false);

  const referralUrl = 'https://feedants.com/r/referral123';

  const loadContest = useCallback(async () => {
    try {
      setLoading(true);
      let data: Competition;
      if (contestId) {
        data = await api.getCompetitionById(contestId);
      } else {
        const comps = await api.getCompetitions();
        // Prefer classical dance contest if available, else first
        const danceComp = comps.find((c) =>
          c.title.toLowerCase().includes('classical dance') || c.category?.toLowerCase().includes('dance')
        );
        data = danceComp || comps[0];
      }
      setCompetition(data);
      // Check registration status from data or active registrations
      if (data.status === 'registered') {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('[ContestDetailsScreen] Failed to fetch contest from database:', error);
    } finally {
      setLoading(false);
    }
  }, [contestId]);

  useEffect(() => {
    loadContest();
  }, [loadContest]);

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      Alert.alert('Copied', referralUrl);
    }
  };

  const handleReferNow = async () => {
    try {
      await Share.share({
        message: `Join ${competition?.title || 'Feedants Dance Contest'} and get a special discount using my referral link: ${referralUrl}`,
        url: referralUrl,
      });
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };

  const handleJoin = async () => {
    if (!competition) return;
    try {
      setIsJoining(true);
      await api.joinCompetition(competition.id);
      setIsRegistered(true);
      Alert.alert(
        language === 'HI' ? 'पंजीकरण सफल! 🎉' : 'Registration Confirmed! 🎉',
        language === 'HI'
          ? `आप "${competition.title}" के लिए पंजीकृत हो गए हैं। अपनी प्रस्तुति तैयार करें और अपलोड करें।`
          : `You have successfully registered for "${competition.title}". Prepare your performance and upload before the deadline.`,
        [
          {
            text: language === 'HI' ? 'अपलोड करें' : 'Upload Submission',
            onPress: () =>
              navigation.navigate('MainTabs', {
                screen: 'Create',
                params: { contestId: competition.id, contestTitle: competition.title },
              }),
          },
          { text: 'OK' },
        ]
      );
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Could not register for contest.');
    } finally {
      setIsJoining(false);
    }
  };

  const handleIntroVideo = () => {
    Alert.alert(
      language === 'HI' ? 'जज का परिचय वीडियो' : 'Judge Intro Video',
      language === 'HI'
        ? `जज ${competition?.judge?.name || 'मंजू दुबे'} का परिचयात्मक वीडियो चल रहा है।`
        : `Playing introduction video of ${competition?.judge?.name || 'Manju Dubey'}. Experience the rhythm, classical nuances, and jury guidelines.`
    );
  };

  const handlePrizeVideo = () => {
    Alert.alert(
      language === 'HI' ? 'पुरस्कार राशि कैसे मिलेगी?' : 'Prize Money Transfer',
      language === 'HI'
        ? 'विजेताओं की पुरस्कार राशि सीधे उनके बैंक खाते या UPI में परिणाम घोषणा के 24 घंटों के भीतर स्थानांतरित की जाती है।'
        : 'Prize money is directly credited to the winner’s verified bank account or UPI ID within 24 hours of result declaration.'
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007d79" />
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
    name: 'Manju Dubey',
    title: 'Professional Kathak Dancer',
    experience: '12+ Years of Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  };

  const dates = competition.dates && competition.dates.length >= 4 ? competition.dates : [
    { label: 'Register Before', date: '10 Aug 26', time: '11:50 PM' },
    { label: 'Submission Starts', date: '6 Aug 26', time: '04:00 AM' },
    { label: 'Submission Ends', date: '30 Aug 26', time: '11:55 PM' },
    { label: 'Result Date', date: '1 Sept 26', time: '11:50 PM' },
  ];

  const winners = competition.previousWinners && competition.previousWinners.length > 0 ? competition.previousWinners : [
    {
      name: 'Riya Shah',
      position: '1st Winner',
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&q=80',
    },
    {
      name: 'Aarav Mehta',
      position: '1st Winner',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Neha Verma',
      position: '2nd Winner',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    },
    {
      name: 'Ishita Choi',
      position: '3rd Winner',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    },
  ];

  const rewards = competition.rewards && competition.rewards.length > 0 ? competition.rewards : [
    { position: '1st Winner', emoji: '🏆', amount: '₹ 550' },
    { position: '2nd Winner', emoji: '🥈', amount: '₹ 300' },
    { position: '3rd Winner', emoji: '🥉', amount: '₹ 240' },
    { position: '4th Winner', emoji: '☆', amount: '₹ 200' },
    { position: '5th Winner', emoji: '☆', amount: '₹ 130' },
    { position: '6th Winner', emoji: '☆', amount: '₹ 80' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Navbar Header */}
      <View style={styles.navBar}>
        <Pressable
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#111827" />
          <Text style={styles.backText}>{language === 'HI' ? 'वापस जाएं' : 'Go back'}</Text>
        </Pressable>

        {/* Language Pill Selector */}
        <View style={styles.langPillContainer}>
          <Pressable
            style={[styles.langOption, language === 'ENG' && styles.langOptionActive]}
            onPress={() => setLanguage('ENG')}
          >
            <Text style={[styles.langOptionText, language === 'ENG' && styles.langOptionTextActive]}>
              ENG
            </Text>
          </Pressable>
          <Pressable
            style={[styles.langOption, language === 'HI' && styles.langOptionActive]}
            onPress={() => setLanguage('HI')}
          >
            <Text style={[styles.langOptionText, language === 'HI' && styles.langOptionTextActive]}>
              हिंदी
            </Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Contest Header Card */}
        <ContestHeader
          title={competition.title}
          tags={competition.tags?.map((t: any) => (typeof t === 'string' ? t : t.label)) || ['Dance', 'Multi-Win']}
          certificateNote={competition.certificateNote || 'Winners get certificate'}
          prizePool={competition.prizePool}
          entryFee={competition.entryFee}
          spotsLeft={competition.spotsLeft}
          totalSpots={competition.totalSpots}
          isRegistered={isRegistered}
        />

        {/* Judge Card */}
        <View style={styles.judgeCard}>
          <View style={styles.judgeHeader}>
            <Image source={{ uri: judge.avatarUrl }} style={styles.judgeAvatar} />
            <View style={styles.judgeInfo}>
              <Text style={styles.judgeLabel}>{language === 'HI' ? 'जज' : 'Judge'}</Text>
              <Text style={styles.judgeName}>{judge.name}</Text>
              <Text style={styles.judgeTitle}>{judge.title || judge.role}</Text>
              <Text style={styles.judgeExp}>{judge.experience || '12+ Years of Experience'}</Text>
            </View>
          </View>
          <Pressable style={styles.introVideoContainer} onPress={handleIntroVideo}>
            <View style={styles.playCircle}>
              <Ionicons name="play" size={18} color="#007d79" style={{ marginLeft: 2 }} />
            </View>
            <Text style={styles.introVideoText}>
              {language === 'HI' ? 'परिचय वीडियो' : 'Intro Video'}
            </Text>
          </Pressable>
        </View>

        {/* Countdown Banner */}
        <CountdownBanner countdown={competition.countdown || '01d : 06h : 28m : 32s'} />

        {/* Important Dates Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {language === 'HI' ? 'महत्वपूर्ण तिथियां' : 'Important Dates'}
          </Text>
          <View style={styles.datesCard}>
            <View style={styles.datesGridRow}>
              <DateItem
                icon="calendar-outline"
                label={language === 'HI' ? 'पंजीकरण अंतिम तिथि' : (dates[0]?.label || 'Register Before')}
                date={dates[0]?.date || '10 Aug 26'}
                time={dates[0]?.time || '11:50 PM'}
              />
              <DateItem
                icon="paper-plane-outline"
                label={language === 'HI' ? 'सबमिशन शुरू' : (dates[1]?.label || 'Submission Starts')}
                date={dates[1]?.date || '6 Aug 26'}
                time={dates[1]?.time || '04:00 AM'}
              />
            </View>
            <View style={styles.datesDivider} />
            <View style={styles.datesGridRow}>
              <DateItem
                icon="arrow-up-outline"
                label={language === 'HI' ? 'सबमिशन समाप्त' : (dates[2]?.label || 'Submission Ends')}
                date={dates[2]?.date || '30 Aug 26'}
                time={dates[2]?.time || '11:55 PM'}
              />
              <DateItem
                icon="trophy-outline"
                label={language === 'HI' ? 'परिणाम तिथि' : (dates[3]?.label || 'Result Date')}
                date={dates[3]?.date || '1 Sept 26'}
                time={dates[3]?.time || '11:50 PM'}
              />
            </View>
          </View>
        </View>

        {/* Previous Winners Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {language === 'HI' ? 'पिछले विजेता' : 'Previous Winners'}
          </Text>
          <WinnerCarousel winners={winners} />
        </View>

        {/* Tabs: About Competition | Judging Parameters | Rules & Eligibility */}
        <View style={styles.tabsContainer}>
          <Pressable style={styles.tabItem} onPress={() => setActiveTab('about')}>
            <Text style={[styles.tabLabel, activeTab === 'about' && styles.activeTabLabel]}>
              {language === 'HI' ? 'प्रतियोगिता के बारे में' : 'About Competition'}
            </Text>
            {activeTab === 'about' && <View style={styles.activeTabIndicator} />}
          </Pressable>
          <Pressable style={styles.tabItem} onPress={() => setActiveTab('judging')}>
            <Text style={[styles.tabLabel, activeTab === 'judging' && styles.activeTabLabel]}>
              {language === 'HI' ? 'निर्णय पैरामीटर' : 'Judging Parameters'}
            </Text>
            {activeTab === 'judging' && <View style={styles.activeTabIndicator} />}
          </Pressable>
          <Pressable style={styles.tabItem} onPress={() => setActiveTab('rules')}>
            <Text style={[styles.tabLabel, activeTab === 'rules' && styles.activeTabLabel]}>
              {language === 'HI' ? 'नियम और पात्रता' : 'Rules & Eligibility'}
            </Text>
            {activeTab === 'rules' && <View style={styles.activeTabIndicator} />}
          </Pressable>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContentContainer}>
          {activeTab === 'about' && (
            <View>
              <Text style={styles.aboutText}>
                {language === 'HI'
                  ? 'यह सभी आयु वर्गों के लिए खुली एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। पारंपरिक नृत्य के माध्यम से अपने जुनून को व्यक्त करें।'
                  : (competition.aboutText ||
                    'This is an online classical dance competition open for all age groups.\nParticipate from anywhere and showcase your talent.\nExpress your passion through traditional dance.')}
              </Text>
              {isExpanded && (
                <View style={styles.extraDetailsContainer}>
                  <Text style={styles.extraDetailText}>
                    • Eligibility: Solo and duet performers across all traditional Indian classical dance styles (Kathak, Bharatanatyam, Odissi, Kuchipudi, Kathakali, Mohiniyattam, Manipuri, Sattriya).
                  </Text>
                  <Text style={styles.extraDetailText}>
                    • Duration: Submissions should be between 1 to 5 minutes.
                  </Text>
                  <Text style={styles.extraDetailText}>
                    • Recording: Landscape video orientation recommended with clear natural or studio lighting and authentic music.
                  </Text>
                  <Text style={styles.extraDetailText}>
                    • Certification: Every verified submission receives a certificate of participation signed by the jury board.
                  </Text>
                </View>
              )}
              <Pressable style={styles.viewMoreRow} onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.viewMoreText}>
                  {isExpanded
                    ? (language === 'HI' ? 'कम देखें' : 'View less')
                    : (language === 'HI' ? 'और देखें' : 'View more')}
                </Text>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={15}
                  color="#007d79"
                />
              </Pressable>
            </View>
          )}

          {activeTab === 'judging' && (
            <View>
              <Text style={styles.aboutText}>
                {language === 'HI'
                  ? 'प्रस्तुतियों का मूल्यांकन तकनीकी सटीकता (40%), ताल और भाव (30%), वेशभूषा और मंच प्रस्तुति (15%), और दर्शक सहभागिता (15%) पर किया जाएगा।'
                  : 'Submissions are evaluated on Technical Precision (40%), Rhythm & Abhinaya (30%), Costuming & Presentation (15%), and Audience Engagement (15%).'}
              </Text>
            </View>
          )}

          {activeTab === 'rules' && (
            <View>
              {competition.rules?.map((rule, idx) => (
                <Text key={idx} style={styles.ruleItemText}>
                  • {rule}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Rewards (All Positions) */}
        <View style={styles.sectionContainer}>
          <View style={styles.rewardsTitleRow}>
            <Text style={styles.sectionTitle}>
              {language === 'HI' ? 'पुरस्कार' : 'Rewards'}
            </Text>
            <Text style={styles.rewardsSubtitle}>
              {language === 'HI' ? ' (सभी स्थान)' : ' (All Positions)'}
            </Text>
          </View>
          <View style={styles.rewardsCard}>
            <RewardsTable rewards={rewards} />
          </View>
        </View>

        {/* Disclaimer Banner */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={18} color="#007d79" style={{ marginRight: 8 }} />
          <Text style={styles.disclaimerText}>
            {language === 'HI'
              ? 'अस्वीकरण: केवल भुगतान करने वाले प्रतिभागियों के योगदान पर निर्णय के लिए विचार किया जाएगा।'
              : 'Disclaimer: Only contributions from paid participants will be considered for judging.'}
          </Text>
        </View>

        {/* Trust & Safety Dual Cards */}
        <View style={styles.trustCardsContainer}>
          {/* Left: How will you receive prize money? */}
          <Pressable style={styles.prizeMoneyCard} onPress={handlePrizeVideo}>
            <View style={styles.prizeVideoIconBox}>
              <Ionicons name="play" size={16} color="#007d79" style={{ marginLeft: 2 }} />
            </View>
            <View style={styles.prizeMoneyTextBox}>
              <Text style={styles.prizeMoneyTitle}>
                {language === 'HI' ? 'पुरस्कार राशि कैसे मिलेगी?' : 'How will you receive prize money?'}
              </Text>
              <Text style={styles.prizeMoneySubtitle}>
                {language === 'HI' ? 'अधिक जानने के लिए वीडियो देखें' : 'Watch video to know more'}
              </Text>
            </View>
          </Pressable>

          <View style={styles.trustDivider} />

          {/* Right: Refund policy & Razorpay */}
          <View style={styles.safetyCard}>
            <View style={styles.safetyRow}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#111827" />
              <Text style={styles.safetyText}>
                {language === 'HI' ? 'रिफंड नीति' : 'Refund policy'}
              </Text>
            </View>
            <View style={[styles.safetyRow, { marginTop: 6 }]}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#111827" />
              <Text style={styles.safetyText}>
                {language === 'HI' ? 'सुरक्षित भुगतान' : 'Secure payments powered by'}
              </Text>
              <Text style={styles.razorpayBrand}> Razorpay</Text>
            </View>
          </View>
        </View>

        {/* Refer & Earn Card */}
        <View style={styles.referralCard}>
          <Ionicons name="megaphone-outline" size={32} color="#009688" style={{ marginTop: 4 }} />
          <View style={styles.referralContent}>
            <Text style={styles.referralTitle}>
              {language === 'HI' ? 'रेफर करें और अधिक छूट पाएं' : 'Refer & Earn more discount'}
            </Text>
            <View style={styles.referralInputRow}>
              <View style={styles.referralUrlBox}>
                <TextInput
                  style={styles.referralUrlText}
                  value={referralUrl}
                  editable={false}
                  selectTextOnFocus
                />
              </View>
              <Pressable style={styles.copyLinkButton} onPress={handleCopyLink}>
                <Text style={styles.copyLinkText}>
                  {copied ? (language === 'HI' ? 'कॉपी हुआ ✓' : 'Copied! ✓') : (language === 'HI' ? 'कॉपी लिंक' : 'Copy Link')}
                </Text>
              </Pressable>
              <Pressable style={styles.referNowButton} onPress={handleReferNow}>
                <Text style={styles.referNowText}>
                  {language === 'HI' ? 'अब रेफर करें' : 'Refer Now'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.referralNote}>
              {language === 'HI' ? 'प्रत्येक साइनअप पर ₹10 कमाएं' : 'You earn ₹10 for every signup'}
            </Text>
          </View>
        </View>

        {/* Hear From Our Users */}
        <Pressable
          style={styles.testimonialsCard}
          onPress={() =>
            Alert.alert(
              'Participant Reviews',
              '“Feedants helped me reach a national audience with my classical Kathak recital!” - Shreya K.\n\n“The jury adjudication feedback was detailed and inspiring.” - Rohan M.'
            )
          }
        >
          <View style={styles.testimonialLeft}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#007d79" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.testimonialTitle}>
                {language === 'HI' ? 'हमारे उपयोगकर्ताओं से सुनें' : 'Hear From Our Users'}
              </Text>
              <Text style={styles.testimonialSubtitle}>
                {language === 'HI' ? 'देखें कि प्रतिभागी Feedants के बारे में क्या कहते हैं' : 'See what participants say about Feedants'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </Pressable>

        {/* Ad Here Banner */}
        <View style={styles.adBanner}>
          <Ionicons name="megaphone-outline" size={14} color="#64748b" style={{ marginRight: 6 }} />
          <Text style={styles.adText}>Ad Here</Text>
        </View>

        {/* Spacing for sticky CTA footer */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Sticky Bottom CTA Button */}
      <View style={styles.stickyFooterContainer}>
        {isRegistered ? (
          <Pressable
            style={styles.ctaButton}
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'Create',
                params: { contestId: competition.id, contestTitle: competition.title },
              })
            }
          >
            <Text style={styles.ctaTitle}>
              {language === 'HI' ? 'सबमिशन अपलोड करें' : 'Upload Submission'}
            </Text>
            <Text style={styles.ctaSubtitle}>
              {language === 'HI' ? 'पंजीकृत' : 'Registered'}
            </Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.ctaButton, isJoining && { opacity: 0.7 }]}
            onPress={handleJoin}
            disabled={isJoining}
          >
            <Text style={styles.ctaTitle}>
              {isJoining
                ? (language === 'HI' ? 'पंजीकरण हो रहा है...' : 'Registering...')
                : (language === 'HI' ? `ज्वाइन करें ${competition.entryFee}` : `Join for ${competition.entryFee}`)}
            </Text>
            <Text style={styles.ctaSubtitle}>
              {language === 'HI' ? `केवल ${competition.spotsLeft} स्थान शेष` : `Only ${competition.spotsLeft} spots left`}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fbfb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748b',
  },
  errorText: {
    fontSize: 15,
    color: '#ba1a1a',
    marginBottom: 16,
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007d79',
    borderRadius: 20,
  },
  backBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  navBar: {
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
  langPillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0f0',
    borderRadius: 20,
    padding: 3,
  },
  langOption: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  langOptionActive: {
    backgroundColor: '#006466',
  },
  langOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  langOptionTextActive: {
    color: '#ffffff',
  },
  scrollContent: {
    paddingTop: 6,
    paddingBottom: 20,
  },
  judgeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e8eeee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  judgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  judgeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e2e8f0',
  },
  judgeInfo: {
    marginLeft: 12,
    flex: 1,
  },
  judgeLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  judgeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 1,
  },
  judgeTitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  judgeExp: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  introVideoContainer: {
    alignItems: 'center',
    marginLeft: 8,
  },
  playCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f7f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introVideoText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  datesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8eeee',
    marginHorizontal: 16,
    padding: 14,
  },
  datesGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  datesDivider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e8eeee',
    marginHorizontal: 16,
    marginTop: 20,
  },
  tabItem: {
    paddingVertical: 10,
    marginRight: 20,
    position: 'relative',
  },
  tabLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#007d79',
    fontWeight: '700',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: '#007d79',
    borderRadius: 2,
  },
  tabContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aboutText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  extraDetailsContainer: {
    marginTop: 8,
    gap: 6,
  },
  extraDetailText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  viewMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 4,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007d79',
  },
  ruleItemText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 6,
  },
  rewardsTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rewardsSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  rewardsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8eeee',
    marginHorizontal: 16,
    padding: 16,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf8f7',
    borderWidth: 1,
    borderColor: '#ccebe8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#1e3a38',
    flex: 1,
    lineHeight: 16,
  },
  trustCardsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8eeee',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeMoneyCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prizeVideoIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e6f7f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prizeMoneyTextBox: {
    marginLeft: 8,
    flex: 1,
  },
  prizeMoneyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  prizeMoneySubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  trustDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#e8eeee',
    marginHorizontal: 8,
  },
  safetyCard: {
    flex: 1,
    justifyContent: 'center',
  },
  safetyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  safetyText: {
    fontSize: 11,
    color: '#111827',
    fontWeight: '500',
  },
  razorpayBrand: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0c2340',
    fontStyle: 'italic',
  },
  referralCard: {
    backgroundColor: '#e6f7f3',
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  referralContent: {
    flex: 1,
    marginLeft: 10,
  },
  referralTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  referralInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  referralUrlBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#bce4da',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  referralUrlText: {
    fontSize: 11,
    color: '#475569',
    padding: 0,
  },
  copyLinkButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#bce4da',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  copyLinkText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  referNowButton: {
    backgroundColor: '#006466',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  referNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  referralNote: {
    fontSize: 10,
    color: '#52796f',
    textAlign: 'right',
    marginTop: 4,
  },
  testimonialsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8eeee',
    marginHorizontal: 16,
    marginTop: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testimonialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  testimonialTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  testimonialSubtitle: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  adBanner: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 16,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  adText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  stickyFooterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 251, 251, 0.95)',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e8eeee',
  },
  ctaButton: {
    backgroundColor: '#006466',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  ctaSubtitle: {
    fontSize: 11,
    color: '#a3faef',
    marginTop: 2,
  },
});
