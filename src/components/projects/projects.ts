interface RawProject {
  name: string;
  summary: string;
  description: string;
  ghUrl: string;
  url?: string;
  date: string;
  featured?: -1 | 0 | 1;
  tags: string[];
}
export interface Chunk {
  text: string;
  id?: number;
}
export type Project = Omit<RawProject, 'summary' | 'description' | 'date'> & {
  id: string;
  summaryChunks: Chunk[];
  descriptionChunks: Chunk[];
  date: Date;
};

const projects: RawProject[] = [
  {
    name: 'cartUnI',
    summary: 'A set of hand-drawn, sketch-styled React UI components that give your app a playful, paper-doodle look.',
    description:
      'cartUnI is a React component library built for developers who want their app to feel fun and a little rough around the edges - on purpose. Every button, card, and input looks like it was sketched by hand, with slightly wobbly borders and organic shapes that are never quite the same twice. It plugs into the shadcn/ui ecosystem, so you can drop it into an existing project without starting from scratch. It also comes with hand-drawn icons, texture effects, and small animations like wobbles and shivers to make the interface feel alive.',
    ghUrl: 'https://github.com/sherlockdoyle/cartUnI',
    url: 'https://sherlockdoyle.github.io/cartUnI/',
    date: '2026-04-16T19:32:15Z',
    tags: [
      'design-system',
      'hand-drawn',
      'sketch',
      'react',
      'shadcn-ui',
      'ui-components',
      'css',
      'animations',
      'typescript',
    ],
  },
  {
    name: 'Tic-Tac-Fish',
    summary: 'A feature-packed Tic Tac Toe game with a self-learning AI that adapts as you play.',
    description:
      "Tic-Tac-Fish takes the classic Tic Tac Toe and cranks it up significantly. You can play on grids from the standard 3*3 all the way up to 15*15, change how many pieces in a row you need to win, or switch to Connect 4 mode. The built-in AI uses negamax combined with a small neural network that actually learns from every game it plays - so the more you play, the better (or worse) it gets depending on who's winning. There's also a heat-map feature that shows you which moves the AI thinks are good or bad, making it a great way to study the game.",
    ghUrl: 'https://github.com/sherlockdoyle/Tic-Tac-Fish',
    url: 'https://sherlockdoyle.github.io/Tic-Tac-Fish/',
    date: '2026-02-28T15:51:57Z',
    tags: ['game', 'tic-tac-toe', 'connect-4', 'ai', 'neural-network', 'angular', 'typescript', 'machine-learning'],
  },
  {
    name: 'my-quotes',
    summary: "A personal archive of short stories and quotes I've written over the years.",
    description:
      "my-quotes is a personal website that is a collection of all the short stories and quotes I've written on YourQuote over the years, serving as both an archive and a reading experience. You can search through everything by tags and categories using plain filters or more complex expressions with AND/OR operators. There's also a semantic search feature that understands the meaning behind your query, not just the keywords. Each quote's page shows a 'random similar' button that finds another quote with a similar feel, powered by pre-computed embeddings that run entirely in the browser.",
    ghUrl: 'https://github.com/sherlockdoyle/my-quotes',
    url: 'https://sherlockdoyle.github.io/my-quotes/',
    date: '2025-11-05T08:11:05Z',
    featured: 1,
    tags: [
      'quotes',
      'writing',
      'react',
      'vite',
      'tailwindcss',
      'semantic-search',
      'transformers-js',
      'embeddings',
      'typescript',
    ],
  },
  {
    name: 'typenative',
    summary:
      'A WIP programming language that looks like TypeScript but compiles to native machine code with no runtime needed.',
    description:
      "TypeNative is a hobby language project with one main goal: take what developers already know from TypeScript and make it compile down to a standalone binary, just like C or C++. You get a familiar syntax with types, classes, and all the usual tools - but the output is a single runnable file with no Node.js or browser needed. On top of TypeScript's features, TypeNative adds things like specific number types (integers, floats, complex numbers), operator overloading, extension functions, and compile-time code execution. It's still very early days - barely anything exists yet.",
    ghUrl: 'https://github.com/sherlockdoyle/typenative',
    date: '2025-09-12T18:05:00Z',
    featured: -1,
    tags: [
      'wip',
      'programming-language',
      'compiler',
      'typescript',
      'native',
      'machine-code',
      'systems-programming',
      'language-design',
    ],
  },
  {
    name: 'mineder',
    summary:
      'A personal Tinder clone you set up just for your partner, with smooth swipe animations and no real matches.',
    description:
      "Mineder is a fun, tongue-in-cheek dating app clone made for exactly one 'match' - your partner. You upload their photos and fill in a profile with their name, bio, and interests, then enjoy swiping right to like or up to superlike. There's no algorithm, no strangers, no inbox, and no left swipes - just a beautifully animated card-swipe experience dedicated to one person. The app is easy to self-host and customize, so anyone can set it up with their loved one's photos and run it locally or deploy it to the web for free.",
    ghUrl: 'https://github.com/sherlockdoyle/mineder',
    url: 'https://mineder.vercel.app/',
    date: '2025-07-26T19:34:17Z',
    tags: ['fun', 'nextjs', 'tailwindcss', 'framer-motion', 'animations', 'typescript', 'react'],
  },
  {
    name: 'prettier-plugin-sort-props',
    summary:
      'A Prettier plugin that automatically sorts JSX props into a consistent, sensible order - with AI-assisted tie-breaking.',
    description:
      "prettier-plugin-sort-props is a code formatting plugin that runs inside Prettier and sorts the props (attributes) on your React components every time you format. It follows a built-in ordering that covers common HTML, SVG, React, and CSS props, and you can add your own custom order on top. When two props are equally ranked and the order isn't clear, a small trained AI model steps in as a tiebreaker. The AI is a compact LSTM trained on real-world JSX files, and it runs locally via ONNX - no server needed. The result is consistently tidy, readable component code without any manual effort.",
    ghUrl: 'https://github.com/sherlockdoyle/prettier-plugin-sort-props',
    url: 'https://www.npmjs.com/package/prettier-plugin-sort-props',
    date: '2025-05-13T17:57:43Z',
    tags: [
      'prettier',
      'plugin',
      'jsx',
      'react',
      'code-formatting',
      'ai',
      'lstm',
      'onnx',
      'typescript',
      'developer-tools',
    ],
  },
  {
    name: 'SimpleOCR',
    summary:
      'A browser-based character recognition demo that matches what you draw to pre-rendered letter templates - no AI needed.',
    description:
      "SimpleOCR is a hands-on demo of how you can recognize handwritten characters without any machine learning model. You draw a letter on a canvas, and the app compares it against a set of pre-drawn characters rendered in multiple fonts. The comparison works by converting everything to a grid of black and white pixels and then scoring how closely they overlap using methods like Jaccard's Index or cosine similarity. It's not highly accurate, but it's a clever approach that came from a long bus ride and some spare time.",
    ghUrl: 'https://github.com/sherlockdoyle/SimpleOCR',
    url: 'https://sherlockdoyle.github.io/SimpleOCR/',
    date: '2024-08-18T16:25:40Z',
    tags: ['ocr', 'character-recognition', 'canvas', 'browser', 'javascript', 'image-processing', 'no-ml'],
  },
  {
    name: 'LameLM',
    summary:
      'A simple in-browser text generator that learns the patterns of any text you give it and continues writing in a similar style.',
    description:
      'LameLM is a lightweight, browser-based language model - no servers, no APIs, no frameworks. You paste in some text (or upload a file), and it learns the character-by-character patterns using a probability table, similar to how a Markov chain works. Then you ask it to generate more text starting from a seed, and it does its best to sound like the original. You can tweak settings like how much randomness to allow, which characters to consider, and how strongly to weight the most common next characters. It was originally built to generate realistic-looking dummy data for a database class.',
    ghUrl: 'https://github.com/sherlockdoyle/LameLM',
    url: 'https://sherlockdoyle.github.io/LameLM/',
    date: '2024-07-28T15:08:34Z',
    tags: [
      'llm',
      'text-generation',
      'markov-chain',
      'browser',
      'typescript',
      'vite',
      'no-framework',
      'machine-learning',
    ],
  },
  {
    name: 'cStDf',
    summary:
      'A collection of fun browser-based puzzles and riddles where the goal is to find a hidden string - like a mini CTF game.',
    description:
      "cStDf is a set of puzzles in the style of Capture the Flag (CTF) challenges. Each puzzle hides a secret string somewhere - in a file, an image, a sound, or a website - and your job is to find it. The puzzles aren't necessarily technical exploits; they're more like creative riddles and brain teasers. Some may reference other projects. The only rule is to play fair and not peek at the solutions, which are encoded and committed separately to keep things honest.",
    ghUrl: 'https://github.com/sherlockdoyle/cStDf',
    url: 'https://sherlockdoyle.github.io/cStDf/',
    date: '2024-04-07T13:54:27Z',
    tags: ['ctf', 'puzzles', 'game', 'vue', 'vuetify', 'steganography', 'riddles', 'typescript'],
  },
  {
    name: 'bin-ocular',
    summary:
      'A tool that hides a shape inside two random-looking noise images that can be revealed when they are overlayed.',
    description:
      'bin-ocular is a steganography project that uses a simple visual trick: it splits a black-and-white shape across two images that each look like random noise on their own. When you layer those two images on top of each other - either on screen or printed on clear plastic sheets - the hidden shape appears. The project works entirely in the browser and lets you encode a shape into up to five separate noise images. It was originally made for a special occasion and builds on a classic technique from visual cryptography.',
    ghUrl: 'https://github.com/sherlockdoyle/bin-ocular',
    url: 'https://sherlockdoyle.github.io/bin-ocular/',
    date: '2023-12-16T16:27:03Z',
    tags: [
      'steganography',
      'visual-cryptography',
      'web-components',
      'lit',
      'image-processing',
      'browser',
      'javascript',
    ],
  },
  {
    name: 'antonemo',
    summary:
      'A daily word game where you unlock letters by finding antonyms and work your way toward one secret final word.',
    description:
      "Antonemo is a browser-based word puzzle game with a fresh challenge every day. You start with a small set of active letters and a keyboard with most keys locked. By forming words from the active letters and finding their opposites (antonyms), you unlock more letters. The goal is to activate enough letters to spell out the hidden final word. It's a game about thinking in opposites - and the word lists, difficulty settings, and daily puzzle generation are all carefully crafted to keep things fair and fun.",
    ghUrl: 'https://github.com/sherlockdoyle/antonemo',
    url: 'https://sherlockdoyle.github.io/antonemo/',
    date: '2023-09-18T09:59:15Z',
    tags: ['game', 'word-game', 'puzzle', 'antonyms', 'daily-game', 'solidjs', 'tailwindcss', 'daisyui', 'nlp'],
  },
  {
    name: 'multi-field-sort',
    summary: 'A small algorithm that sorts items by considering all of their fields together, not just a single one.',
    description:
      "multi-field-sort tackles a quirk of standard sorting: when you sort by multiple criteria, one field usually dominates and the rest barely matter. This algorithm takes a different approach - it ranks each item within each field separately, then multiplies those ranks together to get a final combined score. The result is a sort that weighs all the fields together. It's available in both Python and TypeScript, and was originally built to compare products while shopping online.",
    ghUrl: 'https://github.com/sherlockdoyle/multi-field-sort',
    date: '2023-09-09T14:59:35Z',
    tags: ['algorithm', 'sorting', 'multi-field', 'python', 'typescript', 'data-processing', 'ranking'],
  },
  {
    name: 'Expensus',
    summary: 'A personal expense tracking web app - coming someday.',
    description: 'Expensus is a planned web app for tracking personal expenses. Still on the to-do list.',
    ghUrl: 'https://github.com/sherlockdoyle/Expensus',
    date: '2023-03-22T11:38:44Z',
    featured: -1,
    tags: ['wip'],
  },
  {
    name: 'Deadiction',
    summary:
      'A self-help web app that takes a gradual, incentive-based approach to help you quit a bad habit on your own terms.',
    description:
      "Deadiction is a small offline web app built as a learning project in React. It's aimed at people who want to break a bad habit but can't or don't want to seek outside help. Instead of going cold turkey, it lets you keep doing your habit at first - but with small, growing gaps in between. Over time those gaps get longer, and when you've gone without the habit for a stretch, the app rewards you with a small allowance as motivation. All your data stays in your browser's local storage, so nothing ever leaves your device.",
    ghUrl: 'https://github.com/sherlockdoyle/Deadiction',
    url: 'https://sherlockdoyle.github.io/Deadiction/',
    date: '2021-06-21T19:33:17Z',
    tags: ['habit-tracking', 'health', 'self-help', 'react', 'offline', 'local-storage', 'web-app', 'learning-project'],
  },
  {
    name: 'Pawky',
    summary:
      'A Python library that lets you process text files using a syntax inspired by the classic awk command-line tool.',
    description:
      "Pawky brings the feel of awk - the classic Unix text-processing tool - into Python. You can read files line by line, filter by line number or regex, split fields, redirect output, and run functions before and after file processing, all using a clean Python+AWK-friendly syntax. It's not a replacement for awk and doesn't try to be - it's a for-fun project that makes quick text-file manipulation feel almost natural from within a Python script, saving you from dropping down to the shell (even though, honestly, you probably should).",
    ghUrl: 'https://github.com/sherlockdoyle/Pawky',
    date: '2021-06-07T16:28:07Z',
    tags: ['awk', 'text-processing', 'python', 'cli', 'file-processing', 'scripting', 'library'],
  },
  {
    name: 'Handwriter',
    summary: 'A Python tool that transforms typed, formatted documents into realistic-looking handwritten pages.',
    description:
      "Handwriter is a Python script that takes a document you've typed in a word processor - complete with tables, columns, and formatting - and makes it look like you wrote it by hand. You write normally with a handwriting font, save each page as an image, and then pass the images through the script. It adds realistic touches like slight variations in letter positions, uneven line spacing, line slant, ink fading, and even simulated spelling mistakes that have been crossed out. The result is placed on top of a scanned paper texture for an authentic feel.",
    ghUrl: 'https://github.com/sherlockdoyle/Handwriter',
    date: '2021-05-29T16:13:40Z',
    featured: 1,
    tags: ['handwriting', 'image-processing', 'python', 'opencv', 'numpy', 'document', 'simulation', 'noise'],
  },
  {
    name: 'covidart',
    summary: 'A sa|imple COVID-19 tracker app built with Flutter to learn cross-platform mobile and web development.',
    description:
      "covidart is a learning project built while picking up Flutter. It pulls live COVID-19 statistics from a public API and displays them in a clean interface. The app ran on both mobile and web, making it a useful starting point for anyone exploring Flutter's cross-platform capabilities. The primary focus was on learning the framework rather than building a production-ready tracker - and the API it relied on has since gone offline.",
    ghUrl: 'https://github.com/sherlockdoyle/covidart',
    date: '2020-07-04T16:08:11Z',
    tags: ['flutter', 'dart', 'covid-19', 'tracker', 'mobile', 'web', 'api', 'cross-platform'],
  },
  {
    name: 'AGL',
    summary:
      'A beginner-friendly C++ library that wraps OpenGL to make creating 3D graphics simpler and less overwhelming.',
    description:
      "AGL (abstract-GL) is a C++ library that sits on top of OpenGL and takes away the boilerplate and setup headaches that usually come with learning 3D graphics. Instead of dealing with shaders, window creation, and library linking all at once, AGL lets beginners focus on actually drawing things. It's not meant for high-performance games - it's for learning, experimenting, and quickly putting together 3D visuals without getting lost in the details.",
    ghUrl: 'https://github.com/sherlockdoyle/AGL',
    url: 'https://sherlockdoyle.github.io/AGL/html/index.html',
    date: '2019-12-07T11:54:09Z',
    tags: ['3d', 'cpp', 'graphics', 'opengl', 'library', 'glfw', 'beginner-friendly', 'visualization'],
  },
  {
    name: 'Animator',
    summary:
      'A Python library for creating 2D animations and visualizations, which I keep recreating, built on top of the Skia graphics engine.',
    description:
      "Animator is a Python library that makes it straightforward to create 2D animations and graphics from code. It uses Skia - the same graphics engine behind Chrome and Android - as its backend for speed and quality. You describe your scene with shapes and objects, and the library handles the rendering. It started as a hobby project to explore graphics programming in Python, going through several versions and backends before settling on Skia. It's the project I keep coming back to - my longest-running creative relationship.",
    ghUrl: 'https://github.com/sherlockdoyle/Animator',
    url: 'https://sherlockdoyle.github.io/Animator/',
    date: '2019-06-26T11:12:31Z',
    featured: -1,
    tags: ['animation', 'python', 'skia', 'graphics', '2d', 'visualization', 'library', 'education'],
  },
  {
    name: 'ARRANGE',
    summary: 'A console-based number sliding puzzle game where you arrange numbers into the right order on a grid.',
    description:
      "ARRANGE is a simple command-line game where you're given a grid of shuffled numbers and your job is to slide them into the correct order by swapping adjacent tiles. You pick a number and a direction, and the game swaps it with its neighbor. It supports different grid sizes - from a classic 3*3 to custom dimensions - and even understands natural language input like 'move 5 to the left' or 'I want to play a hard game'. It's a small, fun puzzle game with a surprisingly flexible input system created as a course completion project.",
    ghUrl: 'https://github.com/sherlockdoyle/ARRANGE',
    date: '2017-01-21T16:02:23Z',
    tags: ['game', 'puzzle', 'console', 'java', 'number-game', 'cli', 'sliding-puzzle'],
  },
];

interface Match {
  id: number;
  text: string;
  start1: number;
  start2: number;
}
function buildChunks(str: string, matches: Match[], is1: boolean) {
  matches.sort((a, b) => (is1 ? a.start1 - b.start1 : a.start2 - b.start2));

  const chunks = new Array<Chunk>();
  let curIdx = 0;
  for (const match of matches) {
    const start = is1 ? match.start1 : match.start2;
    if (start > curIdx) {
      const words = str.substring(curIdx, start).split(' ');
      for (let i = 0; i < words.length; ++i) {
        if (i > 0) chunks.push({ text: ' ' });
        chunks.push({ text: words[i] });
      }
    }

    const words = match.text.split(' ');
    for (let i = 0; i < words.length; ++i) {
      if (i > 0) chunks.push({ text: ' ' });
      chunks.push({ text: words[i], id: match.id * 100 + i }); // 100 is safe-ish, we probably more than 100 words in any match.
    }

    curIdx = start + match.text.length;
  }
  if (curIdx < str.length) chunks.push({ text: str.substring(curIdx) });

  return chunks;
}
function getMatchingChunks(s1: string, s2: string): [Chunk[], Chunk[]] {
  const claimed1 = new Uint8Array(s1.length),
    claimed2 = new Uint8Array(s2.length);
  const matches = new Array<Match>();

  while (true) {
    let maxLen = 0;
    let bestStart1 = -1,
      bestStart2 = -1;

    for (let i = 0; i < s1.length; ++i) {
      if (claimed1[i]) continue;

      for (let j = 0; j < s2.length; ++j) {
        if (claimed2[j]) continue;

        let k = 0;
        while (
          i + k < s1.length &&
          j + k < s2.length &&
          s1[i + k] === s2[j + k] &&
          !claimed1[i + k] &&
          !claimed2[j + k]
        )
          ++k;

        if (k > maxLen) {
          maxLen = k;
          bestStart1 = i;
          bestStart2 = j;
        }
      }
    }

    if (maxLen === 0) break;

    for (let k = 0; k < maxLen; ++k) claimed1[bestStart1 + k] = claimed2[bestStart2 + k] = 1;

    matches.push({
      id: matches.length + 1,
      text: s1.substring(bestStart1, bestStart1 + maxLen),
      start1: bestStart1,
      start2: bestStart2,
    });
  }

  return [buildChunks(s1, matches, true), buildChunks(s2, matches, false)];
}

export default projects.map<Project>(({ name, summary, description, date, ...rest }) => {
  const [summaryChunks, descriptionChunks] = getMatchingChunks(summary, description);

  return { id: name.replace(/\s/g, '-'), name, summaryChunks, descriptionChunks, date: new Date(date), ...rest };
});
