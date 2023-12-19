import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchRandomFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      if (!response.ok) {
        throw new Error('Failed to fetch the fact');
      }
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      console.error('Error:', error);
      setFact('Failed to load a new fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const factVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="p-8 rounded-xl shadow-2xl bg-white max-w-lg"
        variants={containerVariants}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Did You Know?
        </h1>
        <motion.p
          className="text-lg text-gray-600 mb-6"
          variants={factVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          {loading ? 'Loading...' : fact}
        </motion.p>
        <motion.button
          className="py-3 px-6 bg-purple-500 text-white rounded-lg w-full"
          onClick={fetchRandomFact}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Tell Me More!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default App;
