export interface ArtStyle {
  id: string
  name: string
  period: string
  description: string
  characteristics: string[]
  famousArtists: string[]
}

export const artStyles: Record<string, ArtStyle> = {
  abstractExpressionism: {
    id: 'abstractExpressionism',
    name: 'Abstract Expressionism',
    period: '20th century to present',
    description: `Abstract Expressionism is a style of painting that emerged in the 1940s and 1950s in the United States. It is characterized by large, gestural brushstrokes and a focus on the emotional and spiritual aspects of the artist's work.`,
    characteristics: [
      'Large, gestural brushstrokes',
      'Emotional and spiritual content',
      'Focus on the subconscious',
      'Use of color and texture',
      'Spontaneous and impulsive style'
    ],
    famousArtists: ['Jackson Pollock', 'Willem de Kooning', 'Franz Kline', 'Robert Motherwell']
  },
  artNouveauModern: {
    id: 'artNouveauModern',
    name: 'Art Nouveau Modern',
    period: '1900-1930s',
    description: `Art Nouveau Modern is a style of art that emerged in the late 19th century and early 20th century. It is characterized by organic, curvy lines and a focus on the natural world.`,
    characteristics: [
      'Organic, curvy lines',
      'Focus on the natural world',
      'Emphasis on the human form',
      'Use of color and texture',
      'Spontaneous and impulsive style'
    ],
    famousArtists: ['Gustav Klimt', 'Egon Schiele', 'Alphonse Mucha', 'Ferdinand Hodler']
  },
  baroque: {
    id: 'baroque',
    name: 'Baroque',
    period: '17th-18th century',
    description: `Baroque art is characterized by grandeur, sensuous richness, drama, vitality, movement, tension, and emotional exuberance.`,
    characteristics: [
      'Dynamic movement and energy',
      'Strong contrast between light and shadow (chiaroscuro)',
      'Dramatic, theatrical compositions',
      'Rich, deep colors',
      'Elaborate ornamentation'
    ],
    famousArtists: ['Caravaggio', 'Rembrandt', 'Rubens', 'Velázquez']
  },
  colorFieldPainting: {
    id: 'colorFieldPainting',
    name: 'Color Field Painting',
    period: '1940s-1960s',
    description: `Color Field Painting emerged as a form of abstract expressionism characterized by large areas of flat, solid color spread across or stained into the canvas, creating a flat picture plane that emphasizes the overall visual field rather than gestural brushstrokes. These works often evoke transcendental experiences through their immersive, meditative qualities.`,
    characteristics: [
      'Large areas of unbroken, flat color',
      'Emphasis on overall visual field rather than distinct forms',
      'Minimal texture and brushwork',
      'Use of staining techniques',
      'Focus on color relationships and emotional impact'
    ],
    famousArtists: ['Mark Rothko', 'Barnett Newman', 'Clyfford Still', 'Helen Frankenthaler']
  },
  cubism: {
    id: 'cubism',
    name: 'Cubism',
    period: 'Early 20th century',
    description: `Cubism revolutionized European painting by depicting objects from multiple viewpoints simultaneously, breaking them down into geometric forms.`,
    characteristics: [
      'Multiple perspectives shown simultaneously',
      'Geometric fragmentation of forms',
      'Limited color palette',
      'Flattened, two-dimensional appearance',
      'Analysis of objects into component shapes'
    ],
    famousArtists: ['Pablo Picasso', 'Georges Braque', 'Juan Gris', 'Fernand Léger']
  },
  earlyRenaissance: {
    id: 'earlyRenaissance',
    name: 'Early Renaissance',
    period: '14th-15th century',
    description: `The Early Renaissance marked the transition from Medieval to Renaissance art, characterized by a renewed interest in classical antiquity, naturalism, and perspective. Artists began to depict the human form with greater anatomical accuracy and placed figures in more realistic spatial settings.`,
    characteristics: [
      'Linear perspective and spatial depth',
      'Anatomical accuracy and naturalistic representation',
      'Classical themes and motifs',
      'Balanced, harmonious compositions',
      'Attention to light and shadow'
    ],
    famousArtists: ['Masaccio', 'Fra Angelico', 'Sandro Botticelli', 'Piero della Francesca', 'Filippo Brunelleschi']
  },
  expressionism: {
    id: 'expressionism',
    name: 'Expressionism',
    period: '20th century',
    description: `Expressionism sought to express emotional experience rather than physical reality, often distorting subjects for emotional effect.`,
    characteristics: [
      'Distorted forms and exaggeration',
      'Intense, non-naturalistic colors',
      'Angular shapes',
      'Emphasis on expressing feelings and emotions',
      'Often dark or pessimistic themes'
    ],
    famousArtists: ['Edvard Munch', 'Ernst Ludwig Kirchner', 'Egon Schiele', 'Emil Nolde']
  },
  highRenaissance: {
    id: 'highRenaissance',
    name: 'High Renaissance',
    period: 'Late 15th-early 16th century',
    description: `The High Renaissance represents the pinnacle of Renaissance art, characterized by perfect harmony, balance, and technical mastery. Artists achieved a new level of sophistication in the application of perspective, anatomical correctness, and compositional arrangement.`,
    characteristics: [
      'Perfect harmony and balance',
      'Idealized beauty and proportions',
      'Masterful use of perspective and sfumato',
      'Monumental scale and grandeur',
      'Technical perfection in execution'
    ],
    famousArtists: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Titian']
  },
  impressionism: {
    id: 'impressionism',
    name: 'Impressionism',
    period: '19th century',
    description: `Impressionism captured the visual impression of a moment, especially effects of light and atmosphere, using small, visible brushstrokes and open composition.`,
    characteristics: [
      'Visible brushstrokes',
      'Open composition',
      'Emphasis on light and its changing qualities',
      'Ordinary subject matter',
      'Unusual visual angles'
    ],
    famousArtists: ['Claude Monet', 'Pierre-Auguste Renoir', 'Edgar Degas', 'Mary Cassatt']
  },
  mannerismLateRenaissance: {
    id: 'mannerismLateRenaissance',
    name: 'Mannerism (Late Renaissance)',
    period: '16th century',
    description: `Mannerism emerged as a reaction to the harmonious ideals of the High Renaissance, characterized by artificiality, sophistication, and technical virtuosity. Artists deliberately distorted proportions and created complex compositions with dramatic tension.`,
    characteristics: [
      'Elongated, often distorted figures',
      'Unnatural colors and lighting',
      'Complex, unstable compositions',
      'Intellectual sophistication and artifice',
      'Emphasis on technical virtuosity'
    ],
    famousArtists: ['Parmigianino', 'El Greco', 'Jacopo Pontormo', 'Rosso Fiorentino']
  },
  minimalism: {
    id: 'minimalism',
    name: 'Minimalism',
    period: '1960s-1970s',
    description: `Minimalism is characterized by extreme simplicity of form and a literal, objective approach. Artists used simple, geometric forms, industrial materials, and emphasized the physical space created by their artwork.`,
    characteristics: [
      'Extreme simplicity of form',
      'Use of industrial materials',
      'Geometric abstraction',
      'Absence of decorative elements',
      'Emphasis on materiality and physical space'
    ],
    famousArtists: ['Anne Truitt', 'Dan Flavin', 'Conrad Marca-Relli', 'Robert Morris']
  },
  naiveArtPrimitivism: {
    id: 'naiveArtPrimitivism',
    name: 'Naive Art (Primitivism)',
    period: '19th-20th century',
    description: `Naive Art is characterized by a simplified style, bold colors, and childlike perspective. Artists often lack formal training, resulting in work that ignores conventional techniques like perspective and proportion.`,
    characteristics: [
      'Simplified forms and childlike perspective',
      'Bold, bright colors',
      'Flattened picture plane',
      'Intuitive rather than formal composition',
      'Detailed, decorative surfaces'
    ],
    famousArtists: ['Henri Rousseau', 'Grandma Moses', 'Niko Pirosmani', 'Maria Primachenko']
  },
  northernRenaissance: {
    id: 'northernRenaissance',
    name: 'Northern Renaissance',
    period: '15th-16th century',
    description: `The Northern Renaissance refers to Renaissance art produced in Northern Europe. It is characterized by extreme attention to detail, symbolism, and advances in oil painting techniques.`,
    characteristics: [
      'Meticulous attention to detail',
      'Rich symbolism and iconography',
      'Mastery of oil painting techniques',
      'Realistic depiction of textures and surfaces',
      'Integration of religious and secular themes'
    ],
    famousArtists: ['Jan van Eyck', 'Albrecht Dürer', 'Hieronymus Bosch', 'Pieter Bruegel the Elder']
  },
  popart: {
    id: 'popart',
    name: 'Pop Art',
    period: '1950s-1970s',
    description: `Pop Art challenged fine art traditions by including imagery from popular culture, using bold colors and commercial techniques.`,
    characteristics: [
      'Use of popular culture imagery',
      'Bold, flat colors',
      'Commercial techniques like screen printing',
      'Irony and parody',
      'Mass production aesthetic'
    ],
    famousArtists: ['Andy Warhol', 'Roy Lichtenstein', 'Claes Oldenburg', 'Hiro Yamagata']
  },
  postImpressionism: {
    id: 'postImpressionism',
    name: 'Post-Impressionism',
    period: 'Late 19th century',
    description: `Post-Impressionism extended Impressionism while rejecting its limitations, emphasizing geometric forms, symbolic content, and more formal structure.`,
    characteristics: [
      'Bold colors',
      'Distinctive brushwork',
      'Thick application of paint',
      'Real-life subject matter with emphasis on geometric forms',
      'Distortion for expressive effect'
    ],
    famousArtists: ['Vincent van Gogh', 'Paul Cézanne', 'Georges Seurat', 'Paul Gauguin']
  },
  realism: {
    id: 'realism',
    name: 'Realism',
    period: 'Mid-19th century',
    description: `Realism aimed to represent subject matter truthfully, without artificiality and avoiding artistic conventions or implausible elements. It emerged in opposition to Romanticism.`,
    characteristics: [
      'Accurate depiction of everyday life',
      'Focus on ordinary people and situations',
      'Rejection of idealization',
      'Social commentary',
      'Detailed observation of visual appearance'
    ],
    famousArtists: ['Gustave Courbet', 'Jean-François Millet', 'James Tissot', 'Winslow Homer']
  },
  rococo: {
    id: 'rococo',
    name: 'Rococo',
    period: '18th century',
    description: `Rococo emerged as a lighter, more playful style than Baroque, featuring pastel colors, asymmetrical designs, and themes of love and mythology.`,
    characteristics: [
      'Pastel colors',
      'Asymmetrical designs',
      'Elaborate ornamentation',
      'Playful themes',
      'Light, airy compositions'
    ],
    famousArtists: ['Jean-Antoine Watteau', 'François Boucher', 'Jean-Honoré Fragonard', 'Bernardo Bellotto']
  },
  romanticism: {
    id: 'romanticism',
    name: 'Romanticism',
    period: 'Late 18th-19th century',
    description: `Romanticism emphasized emotion, individualism, and glorification of nature and the past, particularly the medieval rather than the classical.`,
    characteristics: [
      'Emphasis on emotion and feeling',
      'Interest in nature and landscape',
      'Exploration of the exotic and unknown',
      'Drama and movement',
      'Rich color palettes'
    ],
    famousArtists: ['Eugène Delacroix', 'J.M.W. Turner', 'Gustave Doré', 'Francisco Goya']
  },
  symbolism: {
    id: 'symbolism',
    name: 'Symbolism',
    period: 'Late 19th century',
    description: `Symbolism was a late 19th-century art movement that rejected realism and naturalism in favor of spirituality, imagination, and dreams. It emphasized the symbolic meaning of forms, lines, shapes, and colors.`,
    characteristics: [
      'Mystical and dream-like imagery',
      'Symbolic use of color and form',
      'Themes of death, spirituality, and the subconscious',
      'Rejection of literal representation',
      'Emphasis on emotions and ideas over realistic depictions'
    ],
    famousArtists: ['Gustave Moreau', 'Odilon Redon', 'Edvard Munch', 'Gustav Klimt']
  }
}
