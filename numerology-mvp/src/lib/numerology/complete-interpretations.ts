/**
 * Complete Numerology Interpretations
 * Comprehensive readings for all numbers and categories
 */

export interface NumberInterpretation {
    number: number;
    name: string;
    archetype: string;
    element: string;
    planet: string;
    color: string;
    crystals: string[];

    summary: string;
    coreMessage: string;

    strengths: string[];
    challenges: string[];

    personality: string;
    career: string;
    relationships: string;
    health: string;
    spirituality: string;

    lifeLessons: string;
    shadowSide: string;

    compatibility: {
        best: number[];
        good: number[];
        challenging: number[];
    };

    famousExamples: string[];
    affirmation: string;
}

export const COMPLETE_NUMEROLOGY: Record<number, NumberInterpretation> = {
    1: {
        number: 1,
        name: "The Pioneer",
        archetype: "The Leader",
        element: "Fire",
        planet: "Sun",
        color: "Red, Orange",
        crystals: ["Ruby", "Garnet", "Carnelian"],

        summary: "Number 1 represents new beginnings, independence, individuality, and leadership. It's the number of creation, the first spark of existence, the original thought that becomes reality. Those with this energy are natural pioneers who forge new paths.",

        coreMessage: "You are here to lead, innovate, and express your unique individuality. Your soul chose this path to develop courage, self-reliance, and the ability to stand alone when necessary.",

        strengths: [
            "Natural leader with vision and drive",
            "Independent and self-reliant",
            "Creative and original thinker",
            "Courageous and pioneering",
            "Strong willpower and determination",
            "Ambitious and goal-oriented"
        ],

        challenges: [
            "Can be stubborn or inflexible",
            "May come across as selfish or egocentric",
            "Difficulty asking for or accepting help",
            "Impatience with slower-paced people",
            "Fear of being controlled or dependent",
            "Can be overly competitive"
        ],

        personality: "You radiate confidence and have a magnetic presence that naturally draws others to follow you. Your mind works quickly, generating innovative solutions and original ideas. You prefer to be in control and work best when you have autonomy. While you value others' input, you ultimately trust your own judgment above all else. You have a pioneering spirit that thrives on challenges and new ventures.",

        career: "You excel in leadership positions, entrepreneurship, and any field requiring innovation. Ideal careers include: CEO, entrepreneur, inventor, director, military leader, surgeon, athlete, or any pioneering role in your industry. You work best as your own boss or in positions where you have significant autonomy. Corporate hierarchies can frustrate you unless you're at the top. Your natural competitive drive helps you excel in sales, law, and performance-based careers.",

        relationships: "In relationships, you need a partner who respects your independence and doesn't try to control you. You're attracted to confident individuals who have their own ambitions. Be careful not to dominate relationships or make everything about your needs. Learning to truly listen and consider your partner's desires is key to lasting love. You're loyal and protective once committed, but need space to pursue your individual goals.",

        health: "Your high energy and driven nature can lead to burnout if you don't pace yourself. Watch for stress-related issues, particularly headaches, heart problems, and adrenal fatigue. You benefit from competitive sports and high-intensity exercise that channels your abundant energy. Be mindful of the tendency to push through pain or ignore early warning signs. Regular rest and relaxation practices are essential for maintaining your vitality.",

        spirituality: "Your spiritual path involves learning to balance ego with higher purpose. You're here to discover that true leadership means service, not domination. Meditation on surrender and trust in divine timing can help balance your forceful nature. Your spiritual gifts include the ability to initiate new spiritual movements and inspire others on their path. You may be drawn to shamanic practices or any spiritual path that honors the individual's direct connection to Source.",

        lifeLessons: "Your greatest life lesson is learning that true strength includes vulnerability, and real independence includes the ability to receive help gracefully. You came here to develop courage minus arrogance, leadership minus tyranny, and individuality minus isolation.",

        shadowSide: "When out of balance, Number 1 energy can manifest as arrogance, bullying, aggression, or ruthless ambition. You may steamroll over others' feelings, become a workaholic, or isolate yourself rather than ask for help. The shadow side fears failure, dependence, and being controlled.",

        compatibility: {
            best: [3, 5, 9],
            good: [1, 2, 6],
            challenging: [4, 8]
        },

        famousExamples: ["Martin Luther King Jr.", "Lady Gaga", "Tom Hanks", "Nikola Tesla", "Steve Jobs"],

        affirmation: "I am a natural leader. I trust my unique vision and have the courage to forge my own path. My independence is my strength, and I lead with integrity and heart."
    },

    2: {
        number: 2,
        name: "The Diplomat",
        archetype: "The Peacemaker",
        element: "Water",
        planet: "Moon",
        color: "Orange, Peach",
        crystals: ["Moonstone", "Pearl", "Selenite"],

        summary: "Number 2 embodies duality, partnership, balance, and sensitivity. It represents the principle of receptivity and cooperation. Those with this energy are natural mediators, able to see both sides of any situation and bring harmony to chaos.",

        coreMessage: "You are here to master the art of relationships, cooperation, and emotional intelligence. Your soul chose this path to develop patience, diplomacy, and the profound power of genuine connection.",

        strengths: [
            "Exceptional emotional intelligence",
            "Natural mediator and peacemaker",
            "Deeply intuitive and psychic",
            "Cooperative and supportive",
            "Patient and diplomatic",
            "Excellent listener"
        ],

        challenges: [
            "Can be overly sensitive to criticism",
            "Tendency to be indecisive",
            "May sacrifice own needs for others",
            "Fear of confrontation",
            "Can become passive-aggressive",
            "Prone to depression if unbalanced"
        ],

        personality: "You possess a gentle, receptive nature that makes others feel safe and understood. Your intuition is remarkably accurate, often sensing what others need before they express it. You thrive in partnerships and collaborative environments, finding it easier to work with others than alone. Your diplomatic skills allow you to navigate the most challenging interpersonal situations with grace.",

        career: "You excel in roles requiring diplomacy, partnerships, and emotional sensitivity. Ideal careers include: counselor, therapist, mediator, diplomat, HR professional, nurse, social worker, musician, artist, or assistant to powerful figures. Behind-the-scenes roles often suit you better than spotlight positions. You work best with a partner or in teams where your supportive nature is valued.",

        relationships: "Relationships are central to your life purpose. You're a devoted, caring partner who naturally attunes to your loved one's needs. However, you must guard against losing yourself in relationships or becoming codependent. Learning to maintain your own identity and express your needs clearly is essential. You need a partner who appreciates your sensitivity without taking advantage of your giving nature.",

        health: "Your sensitive nervous system is affected by the energy of those around you. Stress often manifests in digestive issues, anxiety, or immune system weakness. Water-based activities (swimming, baths) are particularly healing. You need more rest and quiet time than others to recharge. Protecting your energy through boundaries and alone time is crucial for your wellbeing.",

        spirituality: "You have natural psychic and intuitive gifts that develop strongly with practice. Your spiritual path involves learning to trust your inner knowing and not let others' opinions overshadow your truth. You may be drawn to lunar spirituality, goddess traditions, or paths emphasizing the divine feminine. Energy healing, channeling, and working with the subtle realms come naturally to you.",

        lifeLessons: "Your greatest life lesson is learning that true cooperation includes the ability to say no, and genuine diplomacy includes being honest about your own needs. You came here to develop sensitivity minus codependency, cooperation minus self-sacrifice, and intuition minus insecurity.",

        shadowSide: "When out of balance, Number 2 energy can manifest as manipulation, passive-aggression, victim mentality, or complete loss of self in relationships. You may become so focused on others' approval that you lose touch with your own desires and truth.",

        compatibility: {
            best: [1, 6, 8],
            good: [2, 4, 9],
            challenging: [3, 5]
        },

        famousExamples: ["Barack Obama", "Madonna", "Jennifer Aniston", "Kanye West", "Emma Watson"],

        affirmation: "I am a bridge between hearts. My sensitivity is my superpower. I maintain my own center while connecting deeply with others."
    },

    3: {
        number: 3,
        name: "The Communicator",
        archetype: "The Artist",
        element: "Fire",
        planet: "Jupiter",
        color: "Yellow, Gold",
        crystals: ["Citrine", "Yellow Topaz", "Amber"],

        summary: "Number 3 represents creative self-expression, communication, joy, and social interaction. It's the number of the Muses, the Trinity, and the creative principle made manifest. Those with this energy bring color, inspiration, and optimism wherever they go.",

        coreMessage: "You are here to create, communicate, and spread joy. Your soul chose this path to develop creative expression, authentic voice, and the ability to inspire others through your gifts.",

        strengths: [
            "Highly creative and artistic",
            "Excellent communicator (verbal/written)",
            "Naturally optimistic and joyful",
            "Socially magnetic and charming",
            "Imaginative and playful",
            "Inspirational to others"
        ],

        challenges: [
            "Tendency to scatter energy",
            "Can be superficial or gossipy",
            "Difficulty with follow-through",
            "May avoid deeper emotions",
            "Prone to exaggeration",
            "Can be moody when not expressing"
        ],

        personality: "You're the life of the party, bringing warmth, humor, and creative spark to every situation. Your words have power—you can inspire, entertain, and uplift with equal skill. You have a childlike quality that keeps you young at heart and drawn to play. Your imagination is vivid and constantly generating new ideas, though focusing on just one can be challenging.",

        career: "You excel in any field involving creativity, communication, or entertainment. Ideal careers include: writer, actor, comedian, artist, musician, teacher, public speaker, marketing, social media, fashion, design, or any form of creative expression. You need variety and room for creative input. Repetitive, uncreative work quickly drains you.",

        relationships: "You need a partner who appreciates your playful nature and doesn't try to make you 'grow up.' Intellectual stimulation and shared humor are essential. Be careful not to avoid difficult conversations by deflecting with jokes or charm. Learning to go deep when needed while maintaining your lightness is key. You're attracted to interesting, creative people who love life.",

        health: "Your throat area is your sensitive zone—watch for throat problems, thyroid issues, or tension in the neck/shoulders when you're not expressing yourself. Suppressed creativity can lead to depression or addiction. Singing, journaling, and any creative outlet is therapeutic. Maintaining joy and avoiding excessive worry is crucial for your immune system.",

        spirituality: "Your spiritual path involves learning that authentic self-expression is sacred service. You're here to discover that creativity is a divine channel and that joy is spiritual practice. You may be drawn to ecstatic spiritual traditions, devotional chanting, creative visualization, or paths that celebrate divine play. Your words carry spiritual power.",

        lifeLessons: "Your greatest life lesson is learning that true creativity includes discipline, and authentic expression includes uncomfortable truths. You came here to develop joy minus escapism, creativity minus scattered energy, and communication minus superficiality.",

        shadowSide: "When out of balance, Number 3 energy can manifest as gossip, manipulation through charm, scattered unfocused energy, or using humor to avoid depth. You may become the class clown who never addresses real issues, or scatter your considerable gifts without completing anything.",

        compatibility: {
            best: [1, 5, 9],
            good: [3, 6, 7],
            challenging: [2, 4, 8]
        },

        famousExamples: ["John Travolta", "Hillary Clinton", "Christina Aguilera", "Snoop Dogg", "Kevin Hart"],

        affirmation: "I am a channel for creative expression. My voice matters, and my joy is contagious. I create beauty and meaning wherever I go."
    },

    4: {
        number: 4,
        name: "The Builder",
        archetype: "The Architect",
        element: "Earth",
        planet: "Uranus/Saturn",
        color: "Green, Brown",
        crystals: ["Emerald", "Jade", "Malachite"],

        summary: "Number 4 represents stability, structure, hard work, and practical manifestation. It's the number of the four directions, four seasons, and the solid foundation upon which all else is built. Those with this energy are the builders of society, creating lasting structures and systems.",

        coreMessage: "You are here to build lasting foundations, master the physical realm, and create security. Your soul chose this path to develop discipline, patience, and the satisfaction of manifesting tangible results through dedicated effort.",

        strengths: [
            "Exceptional organizational skills",
            "Reliable and trustworthy",
            "Strong work ethic",
            "Practical and grounded",
            "Detail-oriented",
            "Creates lasting structures"
        ],

        challenges: [
            "Can be rigid or inflexible",
            "May become workaholic",
            "Tendency toward pessimism",
            "Fear of change or instability",
            "Can be overly controlling",
            "Struggles with spontaneity"
        ],

        personality: "You are the rock others depend upon—stable, reliable, and consistently there when needed. You take commitments seriously and follow through on your word. Your mind naturally organizes chaos into workable systems. You prefer proven methods over untested innovation and value tradition and established ways of doing things.",

        career: "You excel in careers requiring precision, organization, and long-term commitment. Ideal careers include: architect, engineer, accountant, banker, project manager, surgeon, builder, farmer, craftsperson, or any field requiring systematic development. You're not suited for chaotic environments or jobs requiring constant improvisation.",

        relationships: "You're a loyal, devoted partner who takes commitment seriously. You show love through practical support and dependability rather than grand romantic gestures. Be careful not to let work consume time for connection, or to try to control your partner's choices. You need someone who values stability but can occasionally pull you out of your routine.",

        health: "Chronic tension, particularly in bones and skeletal system, can develop from holding too much responsibility. Grounding practices, time in nature, and physical labor are therapeutic. You need regular, consistent routines for optimal health. Watch for rigidity turning into physical stiffness—flexibility exercises are important.",

        spirituality: "Your spiritual path involves learning that spirit and matter are not separate, and that dedicated work is itself spiritual practice. You may be drawn to earthy traditions, ancestor work, or paths emphasizing sacred service through daily actions. Building sacred space (altars, gardens) is powerful practice for you. Karma yoga—spiritual service through work—resonates deeply.",

        lifeLessons: "Your greatest life lesson is learning that true security comes from within not from external structures, and real stability includes the flexibility to change. You came here to develop discipline minus rigidity, practicality minus limitation, and structure minus stagnation.",

        shadowSide: "When out of balance, Number 4 energy can manifest as stubborn resistance to change, workaholic tendencies, excessive control, or building walls around the heart. You may become so focused on security that you miss life's opportunities, or so rigid that you break rather than bend.",

        compatibility: {
            best: [2, 7, 8],
            good: [4, 6, 22],
            challenging: [1, 3, 5, 9]
        },

        famousExamples: ["Oprah Winfrey", "Brad Pitt", "Usher", "Adam Levine", "Elton John"],

        affirmation: "I am a master builder of reality. My patience and dedication create lasting results. I find security within myself while building structures that serve the world."
    },

    5: {
        number: 5,
        name: "The Freedom Seeker",
        archetype: "The Adventurer",
        element: "Air",
        planet: "Mercury",
        color: "Blue, Turquoise",
        crystals: ["Turquoise", "Aquamarine", "Blue Topaz"],

        summary: "Number 5 represents freedom, change, adventure, and the five senses. It's the number of human experience—exploring all that life has to offer. Those with this energy are the explorers, constantly seeking new experiences and resisting all forms of limitation.",

        coreMessage: "You are here to experience freedom and embrace change. Your soul chose this path to develop adaptability, courage for adventure, and the wisdom that comes from diverse life experiences.",

        strengths: [
            "Highly adaptable and versatile",
            "Magnetic and charismatic",
            "Adventurous and courageous",
            "Quick-minded and witty",
            "Excellent communicator",
            "Embraces change and variety"
        ],

        challenges: [
            "Difficulty with commitment",
            "Can be restless and scattered",
            "Prone to overindulgence",
            "May avoid responsibility",
            "Fear of being trapped",
            "Can be unreliable"
        ],

        personality: "You're a magnetic free spirit who craves variety and new experiences. Routine and predictability feel like slow death to you. Your quick mind and adaptability allow you to navigate changing circumstances with ease. You're a natural communicator and storyteller, drawing from your diverse experiences. Your enthusiasm is contagious.",

        career: "You excel in careers offering variety, travel, and freedom. Ideal careers include: travel writer, journalist, salesperson, actor, tour guide, pilot, entrepreneur, marketing, teaching, or any field with varied responsibilities. Traditional 9-5 structures feel suffocating. You need autonomy and the ability to move around.",

        relationships: "You need a partner who values freedom as much as you do and won't try to cage you. Possessive or controlling partners are your worst nightmare. Be careful of your tendency to run when things get difficult or boring. Learning to find freedom within commitment—rather than from it—is your key relationship lesson.",

        health: "Your nervous system is highly active and can lead to anxiety if you don't have enough stimulation and variety. Addictive tendencies are a risk—watchacoal, substances, and thrill-seeking. Regular physical activity that provides variety (travel, different sports) is essential. You need change even in your wellness routine.",

        spirituality: "Your spiritual path involves learning that true freedom is internal and that commitment to a path actually deepens rather than limits experience. You may be drawn to diverse spiritual traditions, experimenting with many before settling (or not). Travel-based spirituality, pilgrimage, and paths that honor the sacredness of sensory experience resonate with you.",

        lifeLessons: "Your greatest life lesson is learning that true freedom includes the choice to commit, and real adventure includes the journey inward. You came here to develop freedom minus escapism, adaptability minus inconsistency, and experience minus overindulgence.",

        shadowSide: "When out of balance, Number 5 energy can manifest as addiction, irresponsibility, inability to commit to anything, or constant running from problems. You may become so focused on the next thrill that you never develop depth or lasting accomplishments.",

        compatibility: {
            best: [1, 3, 7],
            good: [5, 9],
            challenging: [2, 4, 6]
        },

        famousExamples: ["Abraham Lincoln", "Beyoncé", "Angelina Jolie", "Steven Spielberg", "Jon Bon Jovi"],

        affirmation: "I am free to explore all of life's adventures. I embrace change as my teacher and find liberation in every experience. True freedom lives within me."
    },

    6: {
        number: 6,
        name: "The Nurturer",
        archetype: "The Healer",
        element: "Earth",
        planet: "Venus",
        color: "Blue, Indigo",
        crystals: ["Lapis Lazuli", "Blue Sapphire", "Sodalite"],

        summary: "Number 6 represents love, responsibility, family, domestic harmony, and service to others. It's the number of the heart, the home, and the healer. Those with this energy are the nurturers who create beauty and care for their communities.",

        coreMessage: "You are here to love unconditionally and serve through nurturing. Your soul chose this path to develop responsibility, compassion, and the ability to create harmonious environments for growth.",

        strengths: [
            "Deeply loving and nurturing",
            "Strong sense of responsibility",
            "Creates beauty and harmony",
            "Natural healer and counselor",
            "Devoted to family and community",
            "Excellent at creating comfort"
        ],

        challenges: [
            "Can be controlling or interfering",
            "May sacrifice self for others",
            "Tendency to martyr or guilt-trip",
            "Unrealistic expectations of others",
            "Can be critical or perfectionist",
            "Difficulty receiving"
        ],

        personality: "You have an enormous heart that genuinely wants to help and heal others. Creating beauty and harmony in your surroundings is important to you. You take your responsibilities seriously—sometimes too seriously. Others naturally turn to you for advice and emotional support. You have a strong aesthetic sense and an eye for beauty.",

        career: "You excel in healing, teaching, and service professions. Ideal careers include: doctor, nurse, therapist, teacher, counselor, interior designer, chef, musician, social worker, or any role caring for others. You need to feel you're making a positive difference. Purely profit-focused work without heart feels meaningless.",

        relationships: "Family and close relationships are central to your life. You're devoted, protective, and sometimes smothering with your love. Be careful of attracting 'projects'—people you can fix or rescue. Learning the difference between healthy support and codependency is essential. You need a partner who appreciates your nurturing while not taking advantage of it.",

        health: "Heart-related issues and the respiratory system are your sensitive areas, as is anything related to the emotional body. Worry about loved ones can manifest as physical tension. Creating a beautiful, harmonious home environment is therapeutic. You need to receive nurturing as much as you give it—schedule self-care.",

        spirituality: "Your spiritual path involves learning that true service includes self-care, and real love includes healthy boundaries. You may be drawn to heart-centered traditions, devotional paths, or healing arts. Creating sacred space in the home is important practice. Divine love flows through you, but you must first fill your own cup.",

        lifeLessons: "Your greatest life lesson is learning that true love includes allowing others to struggle and grow, and real responsibility includes the responsibility to yourself. You came here to develop nurturing minus controlling, service minus martyrdom, and devotion minus losing yourself.",

        shadowSide: "When out of balance, Number 6 energy can manifest as smothering, controlling love, martyrdom, or using guilt to manipulate. You may become so focused on what others need that you completely abandon your own needs, building resentment over time.",

        compatibility: {
            best: [2, 3, 9],
            good: [1, 4, 6],
            challenging: [5, 7]
        },

        famousExamples: ["John Lennon", "Jodie Foster", "Stevie Wonder", "Eddie Murphy", "Claire Danes"],

        affirmation: "I nurture others from an overflowing cup. My love heals, and my boundaries protect us both. I create harmony by first finding peace within myself."
    },

    7: {
        number: 7,
        name: "The Seeker",
        archetype: "The Mystic",
        element: "Water",
        planet: "Neptune",
        color: "Purple, Violet",
        crystals: ["Amethyst", "Clear Quartz", "Labradorite"],

        summary: "Number 7 represents wisdom, spirituality, analysis, and the search for deeper truth. It's the number of the mystic, the philosopher, and the scientist seeking to understand the mysteries of existence. Those with this energy are the seekers who look beneath the surface.",

        coreMessage: "You are here to seek wisdom and uncover hidden truths. Your soul chose this path to develop inner knowing, spiritual connection, and the ability to bridge the seen and unseen worlds.",

        strengths: [
            "Deeply analytical and insightful",
            "Natural intuition and psychic ability",
            "Independent and self-contained",
            "Excellent researcher",
            "Wisdom-seeking nature",
            "Sees beneath surface appearances"
        ],

        challenges: [
            "Can be emotionally distant",
            "Tendency to isolate",
            "May seem aloof or critical",
            "Difficulty with practical matters",
            "Can be overly skeptical",
            "Fear of vulnerability"
        ],

        personality: "You have a penetrating mind that naturally questions everything and seeks deeper meaning. You're comfortable with solitude—in fact, you require it for your wellbeing. Others may find you mysterious or hard to know, as you don't readily share your inner world. You have high standards and a discriminating nature that can come across as critical.",

        career: "You excel in research, analysis, and spiritual pursuits. Ideal careers include: scientist, researcher, analyst, psychologist, programmer, detective, professor, inventor, spiritual teacher, or any field requiring deep study. You're not suited for heavy social interaction or superficial environments. You need time alone to do your best work.",

        relationships: "You need a partner who respects your need for solitude and doesn't take your reserve personally. Emotional intimacy doesn't come naturally—you'll need to consciously develop it. Be careful not to use intellectual superiority to keep people at a distance. When you do open up, you form profound connections.",

        health: "The nervous system and mental health require attention. Overthinking can lead to anxiety, insomnia, or depression. Quiet time in nature, meditation, and sufficient solitude are essential for your wellbeing. You may be sensitive to substances and should be careful with medications and alcohol. Regular digital detox is particularly important for you.",

        spirituality: "Your spiritual path is arguably the most natural part of your life. You're drawn to meditation, contemplation, and mystical experiences. Orthodox religion may feel too limiting—you seek direct experience of the divine. You may be drawn to esoteric traditions, philosophy, metaphysics, or paths emphasizing inner wisdom over outer ritual.",

        lifeLessons: "Your greatest life lesson is learning that true wisdom includes emotional intelligence, and real spiritual development includes engagement with the world. You came here to develop analysis minus isolation, spiritual seeking minus escapism, and wisdom minus cold detachment.",

        shadowSide: "When out of balance, Number 7 energy can manifest as isolation, intellectual arrogance, paranoia, or spiritual escapism. You may use your powerful mind to keep everyone at a safe distance, or retreat so far inward that you lose touch with practical reality.",

        compatibility: {
            best: [4, 5, 9],
            good: [3, 7, 11],
            challenging: [2, 6, 8]
        },

        famousExamples: ["Leonardo DiCaprio", "Julia Roberts", "Princess Diana", "Marilyn Monroe", "Johnny Depp"],

        affirmation: "I am a seeker of truth connected to infinite wisdom. My solitude nourishes me and my insights serve others. I bridge heaven and earth."
    },

    8: {
        number: 8,
        name: "The Powerhouse",
        archetype: "The Executive",
        element: "Earth",
        planet: "Saturn",
        color: "Black, Brown, Dark Blue",
        crystals: ["Black Onyx", "Tiger's Eye", "Snowflake Obsidian"],

        summary: "Number 8 represents power, abundance, karma, and material mastery. It's the number of manifestation, authority, and the balance between the spiritual and material worlds. Those with this energy are here to master power and create abundance that serves a higher purpose.",

        coreMessage: "You are here to master power and abundance while maintaining integrity. Your soul chose this path to develop authority, material competence, and understanding of karma and the right use of power.",

        strengths: [
            "Natural business acumen",
            "Strong leadership presence",
            "Excellent judge of character",
            "Manifests material success",
            "Resilient and determined",
            "Understands power dynamics"
        ],

        challenges: [
            "Can be materialistic or greedy",
            "May abuse power",
            "Tendency to be controlling",
            "Workaholic tendencies",
            "Can be ruthless",
            "Financial extremes (very rich or karmic struggles)"
        ],

        personality: "You have a commanding presence that naturally attracts respect and authority. Your drive for success is powerful, and you have the stamina to achieve ambitious goals. You see the big picture and understand how to organize people and resources to achieve objectives. You're comfortable with power and responsibility in ways that others find intimidating.",

        career: "You excel in business, finance, and positions of authority. Ideal careers include: CEO, banker, investor, real estate, law, management, judge, surgeon, or any field involving large-scale achievement. You're suited for leadership roles and handling significant responsibility. Self-employment and entrepreneurship often call you.",

        relationships: "You need a partner who can handle your intensity and isn't intimidated by your power. Power struggles in relationships are a risk if you try to control your partner. Learning that love isn't a business negotiation is important. When balanced, you're deeply loyal and provide security and abundance for those you love.",

        health: "Stress-related illnesses, particularly affecting the digestive system and heart, are risks. The drive for success can become workaholism that depletes health. Physical exercise helps channel your powerful energy. You need to consciously balance work with rest and play. Power yoga and martial arts are especially beneficial.",

        spirituality: "Your spiritual path involves learning that true power serves others and that material abundance flows from alignment with higher purpose. Karma is a central theme—you may experience pronounced swings of fortune that teach lessons about right use of resources. You're here to prove that spiritual and material success can coexist.",

        lifeLessons: "Your greatest life lesson is learning that true power includes the power to be gentle, and real abundance includes knowing enough is enough. You came here to develop authority minus abuse, abundance minus greed, and power minus corruption.",

        shadowSide: "When out of balance, Number 8 energy can manifest as ruthlessness, greed, corruption, or tyrannical control. You may become obsessed with status and wealth at any cost, or misuse your considerable power to dominate others.",

        compatibility: {
            best: [2, 4, 6],
            good: [8, 22],
            challenging: [1, 3, 7, 9]
        },

        famousExamples: ["Nelson Mandela", "Pablo Picasso", "Elizabeth Taylor", "Sandra Bullock", "50 Cent"],

        affirmation: "I am a master of abundance using power for the highest good. Material success flows to me as I serve others. I balance worldly achievement with spiritual integrity."
    },

    9: {
        number: 9,
        name: "The Humanitarian",
        archetype: "The Sage",
        element: "Fire",
        planet: "Mars",
        color: "Gold, White",
        crystals: ["Gold", "Diamond", "Clear Quartz"],

        summary: "Number 9 represents completion, wisdom, humanitarianism, and universal love. It's the number of the old soul who has traveled far and returns to share wisdom. Those with this energy are the sages and healers, concerned with the welfare of all humanity.",

        coreMessage: "You are here to serve humanity and share your accumulated wisdom. Your soul chose this path to develop universal compassion, selfless service, and the ability to bring healing and wisdom to the world.",

        strengths: [
            "Deeply compassionate and giving",
            "Broad perspective and wisdom",
            "Natural teacher and healer",
            "Artistic and creative",
            "Charismatic and magnetic",
            "Inspires others to higher ideals"
        ],

        challenges: [
            "Difficulty with endings and letting go",
            "Can be self-righteous or preachy",
            "May sacrifice too much for causes",
            "Tendency toward burnout",
            "Can be impractical idealist",
            "May feel misunderstood or isolated"
        ],

        personality: "You have an old soul quality that others sense immediately. Your perspective is broad and inclusive, seeing the bigger picture of humanity's journey. You're naturally drawn to helping others and may feel called to address societal problems. Your creativity often has a healing or inspirational quality. You attract people from all walks of life.",

        career: "You excel in roles serving humanity and expressing creativity. Ideal careers include: humanitarian work, international development, teaching, acting, healing arts, philanthropy, or any creative field with broad impact. You need work that makes a meaningful difference. Purely profit-motivated careers feel empty.",

        relationships: "Your love extends to all humanity, which can make personal relationships challenging. Partners may feel they can't compete with your broader causes. Learning to balance universal love with personal intimacy is key. You attract diverse people and may have many significant relationships throughout life. Be careful not to be so focused on saving the world that you neglect those closest to you.",

        health: "Adrenal fatigue and burnout from giving too much are your primary health risks. You must learn to set boundaries on your service. The arts and creative expression are particularly therapeutic. Your health is connected to finding meaning and serving your higher purpose. Depression can occur when you feel you're not making a difference.",

        spirituality: "Your spiritual path involves learning to let go and trust that the universe continues without your constant intervention. You may feel you must complete some great mission in this lifetime. You're drawn to universal spiritual truths that transcend specific traditions. Service is your spiritual practice, but you must also develop personal spiritual disciplines to sustain your service.",

        lifeLessons: "Your greatest life lesson is learning that true service includes self-care, and real wisdom includes knowing you can't save everyone. You came here to develop compassion minus savior complex, idealism minus impracticality, and generosity minus depletion.",

        shadowSide: "When out of balance, Number 9 energy can manifest as the wounded healer who hasn't healed themselves, the self-righteous preacher, or the martyr who sacrifices everything and resents it. You may become bitter when the world doesn't match your ideals.",

        compatibility: {
            best: [1, 3, 6],
            good: [2, 5, 7, 9],
            challenging: [4, 8]
        },

        famousExamples: ["Mahatma Gandhi", "Mother Teresa", "Elvis Presley", "Whitney Houston", "Jim Carrey"],

        affirmation: "I am a vessel for universal love flowing through me to heal the world. My wisdom and compassion make a difference. I serve humanity while honoring my own needs."
    },

    11: {
        number: 11,
        name: "The Illuminator",
        archetype: "The Visionary",
        element: "Air",
        planet: "Neptune/Moon",
        color: "Silver, White",
        crystals: ["Moonstone", "Clear Quartz", "Selenite"],

        summary: "Master Number 11 represents spiritual illumination, intuition, and inspired leadership. It carries the energy of 2 (1+1) but amplified to a higher octave. Those with this energy are channels for spiritual insight who inspire others through their connection to higher consciousness.",

        coreMessage: "You are here as a spiritual messenger and illuminator of truth. Your soul chose this master path to develop profound intuition, inspired leadership, and the ability to channel higher wisdom for humanity's benefit.",

        strengths: [
            "Highly intuitive and psychic",
            "Inspired visionary leadership",
            "Channels higher wisdom",
            "Magnetic charisma",
            "Innovative and ahead of time",
            "Inspires spiritual awakening in others"
        ],

        challenges: [
            "High-strung nervous system",
            "Prone to anxiety and nervous tension",
            "Can feel misunderstood or isolated",
            "May struggle to ground visions in reality",
            "Extreme sensitivity to environment",
            "Tendency for addictive escapism"
        ],

        personality: "You operate on a higher frequency than most, receiving intuitive downloads and visions that others don't access. Your presence is electric—people feel energized or inspired just being near you. You may have felt different from others your whole life, as if you could see things they couldn't. Your insights often prove prophetic.",

        career: "You excel in roles requiring inspiration, innovation, and spiritual leadership. Ideal careers include: spiritual teacher, inspirational speaker, inventor, artist, therapist, channel, writer, performer, or any field where you can inspire transformation. You're not suited for mundane, routine work. You need to express your vision.",

        relationships: "You need a partner who can handle your intensity and support your spiritual mission. Ordinary relationships feel unfulfilling—you crave deep spiritual and soul connection. Be careful not to be so focused on higher realms that you neglect earthly partnership needs. Learning to ground your energy helps relationships significantly.",

        health: "Your nervous system is highly sensitive and requires special care. Anxiety, insomnia, and nervous exhaustion are risks. You're extremely sensitive to environments, foods, substances, and other people's energy. Regular grounding practices, adequate rest, and protection of your energy field are essential. Avoid stimulants and be careful with anything that alters consciousness.",

        spirituality: "Spirituality isn't something you practice—it's who you are. Your challenge is learning to ground your profound spiritual experiences into practical reality. You may have natural gifts in channeling, prophecy, healing, or other metaphysical arts. The key is developing discipline to use these gifts responsibly rather than being overwhelmed by them.",

        lifeLessons: "Your greatest life lesson is learning to ground visionary insight into practical reality and to use your gifts in service rather than ego. You came here to develop intuition minus anxiety, inspiration minus impracticality, and spiritual leadership minus grandiosity.",

        shadowSide: "When out of balance, Master 11 energy can manifest as delusion, messiah complex, nervous breakdown, or addiction. The intensity can become self-destructive if not properly channeled. You may oscillate between feeling like a chosen messenger and feeling like a complete fraud.",

        compatibility: {
            best: [2, 4, 6, 22],
            good: [7, 9, 11, 33],
            challenging: [1, 5, 8]
        },

        famousExamples: ["Barack Obama", "Bill Clinton", "Michelle Obama", "Prince William", "Wolfgang Amadeus Mozart"],

        affirmation: "I am an illuminated channel for higher wisdom. My intuition is clear and accurate. I ground my visions into reality to serve humanity's awakening."
    },

    22: {
        number: 22,
        name: "The Master Builder",
        archetype: "The Architect of Dreams",
        element: "Earth",
        planet: "Saturn/Neptune",
        color: "Gold, Coral",
        crystals: ["Ruby", "Gold", "Diamond"],

        summary: "Master Number 22 represents the master builder who manifests dreams on a grand scale. It carries the energy of 4 (2+2) but amplified to its highest potential. Those with this energy possess the rare ability to turn visionary dreams into tangible reality that serves humanity.",

        coreMessage: "You are here to build lasting structures that serve humanity's evolution. Your soul chose this master path to develop the ability to ground spiritual vision into practical, large-scale manifestation.",

        strengths: [
            "Combines vision with practical ability",
            "Manifests on large scale",
            "Natural leader of large projects",
            "Bridges spiritual and material",
            "Exceptional organizational ability",
            "Creates lasting legacies"
        ],

        challenges: [
            "Enormous pressure and responsibility",
            "May be overwhelmed by potential",
            "Workaholic tendencies",
            "Can be controlling or domineering",
            "Fear of failing the mission",
            "May underperform out of fear"
        ],

        personality: "You have a unique combination of practical competence and visionary insight. Where Master 11 receives the vision, Master 22 has the ability to actually build it. Your projects tend to be large in scope—you think in terms of movements, institutions, and legacy. Your grounded presence inspires confidence in others.",

        career: "You excel in large-scale building, whether literal or metaphorical. Ideal careers include: architecture, international development, founding institutions, political leadership, large business ventures, or any field requiring vision plus practical execution. You're meant for significant impact—small projects may feel limiting.",

        relationships: "You need a partner who understands and supports your mission without being consumed by it. Your work can be all-consuming, leaving partners feeling secondary. Learning to balance large ambitions with personal intimacy is essential. When balanced, you create stable, abundant foundations for your loved ones.",

        health: "The weight of your potential and responsibility can manifest as chronic stress, particularly affecting bones, teeth, and skeletal system. Grounding practices, time in nature, and conscious relaxation are essential. You must deliberately carve out time for rest and pleasure. Physical building activities (gardening, crafting) are therapeutic.",

        spirituality: "Your spiritual path involves learning that you are the instrument, not the source, of divine creation. The pressure of your gifts eases when you recognize you're channeling something larger than yourself. You may be called to build spiritual communities, institutions, or systems that endure beyond your lifetime.",

        lifeLessons: "Your greatest life lesson is learning that you don't have to carry the weight alone and that legacy isn't about ego. You came here to develop mastery minus domination, large-scale building minus burnout, and vision plus patience.",

        shadowSide: "When out of balance, Master 22 energy can manifest as tyrannical control, nervous breakdown from pressure, or tragically unfulfilled potential where the person never attempts their mission. Some 22s underperform as the weight of potential paralyzes them.",

        compatibility: {
            best: [4, 6, 8, 11],
            good: [2, 22, 33],
            challenging: [3, 5, 7]
        },

        famousExamples: ["The Dalai Lama", "Paul McCartney", "Sir Richard Branson", "Will Smith", "Michael Jordan"],

        affirmation: "I am a master builder channeling divine architecture into earthly form. My visions become reality through patient, dedicated effort. I build for the benefit of all."
    },

    33: {
        number: 33,
        name: "The Master Teacher",
        archetype: "The Healer of Hearts",
        element: "Fire/Water",
        planet: "Venus/Neptune",
        color: "Turquoise, Skyblue",
        crystals: ["Turquoise", "Larimar", "Aquamarine"],

        summary: "Master Number 33 represents the master teacher whose life is dedicated to love, service, and lifting humanity's consciousness. It carries the energy of 6 (3+3) but at its highest expression—selfless, healing love that transforms all it touches.",

        coreMessage: "You are here as a master teacher of love and healing. Your soul chose this rare master path to develop unconditional love, selfless service, and the ability to heal through the power of compassion.",

        strengths: [
            "Unconditional love and acceptance",
            "Master teacher and healer",
            "Elevates others' consciousness",
            "Transforms through love",
            "Natural counselor",
            "Profound spiritual gifts"
        ],

        challenges: [
            "May sacrifice everything for others",
            "Can develop martyr complex",
            "Extreme sensitivity to suffering",
            "Risk of being exploited",
            "May take on others' pain",
            "Difficulty with self-care"
        ],

        personality: "You radiate a love that others feel as soon as they meet you. Your presence is healing—people feel better just being near you. You're a natural teacher who elevates others through example rather than preaching. Your compassion extends to all beings, sometimes making it difficult to witness the world's suffering.",

        career: "You excel in healing, teaching, and selfless service. Ideal careers include: spiritual teacher, healer, counselor, humanitarian leader, inspirational speaker, artist focused on healing, or any role where you uplift others through love. Money often flows to support your work when you're aligned with your purpose.",

        relationships: "You love deeply and devotedly, often attracting those who need healing. Be careful not to become the rescuer in relationships or to give so much that you deplete yourself. You need a partner who can receive your love fully while also nurturing you. Your relationships can be profound spiritual unions.",

        health: "Taking on others' pain and emotions is your greatest health risk. Strong boundaries and energy protection are essential. Your heart and throat areas are sensitive. Creative expression is a necessary outlet to process all you absorb. Regular energy clearing and time alone for renewal are non-negotiable.",

        spirituality: "You are essentially a walking prayer. Your spiritual path involves learning that you don't have to suffer to serve, and that self-love is not selfish. You may have powerful healing gifts that develop throughout life. Many 33s don't fully step into their power until later in life.",

        lifeLessons: "Your greatest life lesson is learning that loving others includes loving yourself, and true teaching includes allowing others their own journey. You came here to develop compassion minus martyrdom, service minus depletion, and love minus sacrifice of self.",

        shadowSide: "When out of balance, Master 33 energy can manifest as the wounded healer who neglects themselves, the martyr who guilts others with their sacrifice, or the spiritual teacher with unchecked ego. You may become so focused on others' pain that you lose yourself completely.",

        compatibility: {
            best: [6, 9, 11, 22],
            good: [3, 33],
            challenging: [1, 4, 8]
        },

        famousExamples: ["Albert Einstein", "Stephen King", "Thomas Edison", "Francis Ford Coppola", "Meryl Streep"],

        affirmation: "I am love in human form, teaching through my presence and healing through my heart. My service to others flows from my own fullness. I love myself as I love others."
    }
};

/**
 * Get complete interpretation for a number
 */
export function getCompleteInterpretation(number: number): NumberInterpretation | null {
    return COMPLETE_NUMEROLOGY[number] || null;
}

/**
 * Get all master number interpretations
 */
export function getMasterNumberInterpretations(): NumberInterpretation[] {
    return [COMPLETE_NUMEROLOGY[11], COMPLETE_NUMEROLOGY[22], COMPLETE_NUMEROLOGY[33]];
}
