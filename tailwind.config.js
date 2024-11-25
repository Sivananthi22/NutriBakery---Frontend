module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'dots-pattern': "radial-gradient(#eecdde 1px, transparent 1px)",
      },
      backgroundSize: {
        'dots-pattern-size': '10px 10px',
      },
      animation: {
        riseBake: 'riseBake 3s ease-in-out infinite',          // Rising bakery animation
        riseBakeHover: 'riseBakeHover 1.5s ease-in-out',       // Hover effect to emphasize rising
        glowWarm: 'glowWarm 2s ease-in-out infinite',          // Warm glowing animation
        inflateButton: 'inflateButton 1.5s ease-in-out',       // Inflation-like effect for button
      },
      keyframes: {
        riseBake: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1) translateY(0)' },
          '50%': { opacity: '1', transform: 'scale(1.05) translateY(-5px)' }, // Inflating and rising
        },
        riseBakeHover: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.08) translateY(-8px)' }, // Slightly more intense rise on hover
        },
        glowWarm: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }, // Simulate a warm glow on the button
        },
        inflateButton: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0px 0px 15px rgba(255, 160, 0, 0.5)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0px 0px 30px rgba(255, 160, 0, 0.7)' }, // Button "puffs up" and glows
        },
      },
    },
  },
  plugins: [],
}
