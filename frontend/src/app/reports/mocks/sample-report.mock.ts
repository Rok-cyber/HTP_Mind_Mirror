import { ReportViewModel } from '../models/report.model';

export const sampleReport: ReportViewModel = {
  info: {
    user: 'Demo User',
    date: '2026.06.28',
    type: 'Adult'
  },
  summary:
    'This sample HTP report presents a non-diagnostic view of emotional tension, adaptation pressure, relationship needs, and social expression patterns. Scores are normalized around a baseline of 50; higher scores indicate signals that may deserve closer reflection.',
  categories: [
    {
      key: 'emotion',
      title: 'Emotional Signals',
      eyebrow: 'Emotion Domain',
      description: 'Indicators related to mood, anxiety, compulsive tension, and anger response.',
      summary: 'Anger and depressive mood signals are relatively elevated in this synthetic sample.',
      detail:
        'The emotion domain suggests a pattern of inner tension and quick emotional activation. This does not imply a diagnosis; it simply gives language for noticing when stress may become sharper, heavier, or harder to reset.',
      detailCards: [
        {
          title: 'Primary Signal',
          body: 'The anger score is the most elevated, suggesting that stress may sometimes appear as sensitivity, irritation, or fast emotional escalation.',
          tone: 'signal'
        },
        {
          title: 'Emotional Context',
          body: 'Depressive mood and anxiety are also above baseline, so the pattern is better read as a combined emotional load rather than one isolated reaction.',
          tone: 'context'
        },
        {
          title: 'Supportive Direction',
          body: 'A steady daily rhythm, low-pressure reflection, and clearer naming of stress triggers may help reduce emotional overload.',
          tone: 'support'
        }
      ],
      color: '#D46A5A',
      metrics: [
        { key: 'depression', label: 'Mood Weight', score: 72, sourceField: 'sr_1_1' },
        { key: 'anxiety', label: 'Anxiety', score: 65, sourceField: 'sr_1_2' },
        { key: 'compulsion', label: 'Control Tension', score: 40, sourceField: 'sr_1_3' },
        { key: 'anger', label: 'Anger Response', score: 80, sourceField: 'sr_1_4' }
      ]
    },
    {
      key: 'adaptation',
      title: 'Adaptation Pressure',
      eyebrow: 'Adaptation Domain',
      description: 'Indicators related to self-control, reality adaptation, body-related concern, avoidance, and fixation.',
      summary: 'Reality adaptation and fixation signals are prominent in this sample.',
      detail:
        'The adaptation domain shows an effort to maintain structure while stress may narrow flexibility. When demands feel vague or too large, the person may benefit from smaller next steps and clearer decision paths.',
      detailCards: [
        {
          title: 'Adjustment Load',
          body: 'Elevated adaptation pressure can mean that ambiguous situations require more mental energy to organize.',
          tone: 'signal'
        },
        {
          title: 'Coping Pattern',
          body: 'Avoidance is moderately elevated, suggesting that stepping back may sometimes be used as a way to protect energy.',
          tone: 'context'
        },
        {
          title: 'Practical Support',
          body: 'Short decision paths and concrete next actions can support self-control without increasing rigidity.',
          tone: 'support'
        }
      ],
      color: '#D9A441',
      metrics: [
        { key: 'self-control', label: 'Self-Control', score: 58, sourceField: 'sr_2_1' },
        { key: 'reality-maladaptation', label: 'Reality Load', score: 74, sourceField: 'sr_2_2' },
        { key: 'body-maladaptation', label: 'Body Concern', score: 62, sourceField: 'sr_2_3' },
        { key: 'escape', label: 'Avoidance', score: 68, sourceField: 'sr_2_4' },
        { key: 'fixation', label: 'Fixation', score: 77, sourceField: 'sr_2_5' }
      ]
    },
    {
      key: 'relationship',
      title: 'Relationship Patterns',
      eyebrow: 'Relationship Domain',
      description: 'Indicators related to dominance, hostility, dependency, withdrawal, relationship need, and conflict sensitivity.',
      summary: 'Withdrawal and conflict sensitivity are elevated, while relationship need is also present.',
      detail:
        'The relationship pattern is not simple detachment. The sample shows both caution and a meaningful desire for connection, which can create an approach-and-distance rhythm in close relationships.',
      detailCards: [
        {
          title: 'Relational Posture',
          body: 'A high withdrawal score may reflect a protective distance when relationships feel demanding or uncertain.',
          tone: 'signal'
        },
        {
          title: 'Need for Connection',
          body: 'Relationship need is also visible, so distance should not be read as lack of care.',
          tone: 'context'
        },
        {
          title: 'Interpretation Note',
          body: 'Conflict sensitivity should be read together with withdrawal; tension may be internalized before it is expressed.',
          tone: 'support'
        }
      ],
      color: '#49675F',
      metrics: [
        { key: 'dominance', label: 'Dominance', score: 54, sourceField: 'sr_3_1' },
        { key: 'hostility', label: 'Hostility', score: 67, sourceField: 'sr_3_2' },
        { key: 'dependency', label: 'Dependency', score: 49, sourceField: 'sr_3_3' },
        { key: 'withdrawal', label: 'Withdrawal', score: 79, sourceField: 'sr_3_4' },
        { key: 'relationship-need', label: 'Connection Need', score: 70, sourceField: 'sr_3_5' },
        { key: 'conflict', label: 'Conflict Sensitivity', score: 76, sourceField: 'sr_3_6' }
      ]
    },
    {
      key: 'tendency',
      title: 'Social Expression',
      eyebrow: 'Expression Domain',
      description: 'Indicators related to confidence, activity, achievement, extroversion, and defensiveness.',
      summary: 'Defensiveness is elevated, while activity and extroversion are lower in this sample.',
      detail:
        'The social expression domain suggests a selective way of showing energy. Motivation can be present, but it may become easier to express when expectations are clear and the environment feels psychologically safe.',
      detailCards: [
        {
          title: 'Expression Style',
          body: 'A high defensiveness score may indicate careful self-presentation and a need to assess safety before opening up.',
          tone: 'signal'
        },
        {
          title: 'Energy Pattern',
          body: 'Lower activity and extroversion scores suggest social participation may be selective rather than broadly expansive.',
          tone: 'context'
        },
        {
          title: 'Growth Condition',
          body: 'When expectations are clear, achievement motivation may become more stable and easier to express.',
          tone: 'support'
        }
      ],
      color: '#A8C7D7',
      metrics: [
        { key: 'confidence', label: 'Confidence', score: 57, sourceField: 'sr_4_1' },
        { key: 'activeness', label: 'Activity', score: 48, sourceField: 'sr_4_2' },
        { key: 'achievement', label: 'Achievement Drive', score: 64, sourceField: 'sr_4_3' },
        { key: 'extroversion', label: 'Extroversion', score: 45, sourceField: 'sr_4_4' },
        { key: 'defensiveness', label: 'Defensiveness', score: 82, sourceField: 'sr_4_5' }
      ]
    }
  ],
  images: [
    {
      label: 'House',
      imageUrl: 'assets/placeholders/house.svg',
      note: 'Synthetic house drawing placeholder'
    },
    {
      label: 'Tree',
      imageUrl: 'assets/placeholders/tree.svg',
      note: 'Synthetic tree drawing placeholder'
    },
    {
      label: 'Person',
      imageUrl: 'assets/placeholders/person.svg',
      note: 'Synthetic person drawing placeholder'
    }
  ]
};
