type messages = {
  role: string,
  message: string,
  timestamp: string,
}
type Chat = {
  id: string,
  name: string,
  userId: string,
  messages: messages[]
}

export const chats : Chat[] = [
  {
    id: '1',
    name: 'How is the weather in the Hawaiian Islands?',
    userId: '1',
    messages: [
      {
        role: 'user',
        message: 'How is the weather in the Hawaiian Islands?',
        timestamp: '10:00 AM',
      },
      {
        role: 'bot',
        message: 'The weather in the Hawaiian Islands is generally warm and sunny, with temperatures ranging from 75 to 85 degrees Fahrenheit year-round. However, the islands do experience some rain, especially in the winter months. Overall, the weather in Hawaii is perfect for outdoor activities like hiking, surfing, and snorkeling.',
        timestamp: '10:01 AM',
      },
      {
        role: 'user',
        message: 'What are the best things to do in Hawaii?',
        timestamp: '10:02 AM',
      },
      {
        role: 'bot',
        message: 'There are so many amazing things to do in Hawaii! Some popular activities include visiting the beautiful beaches, exploring the lush rainforests, hiking to breathtaking waterfalls, and snorkeling in the crystal-clear waters. You can also take a helicopter tour of the islands, go whale watching, or attend a traditional luau. Hawaii truly has something for everyone!',
        timestamp: '10:03 AM',
      },
      {
        role: 'user',
        message: 'Can you recommend a good hiking trail?',
        timestamp: '10:04 AM',
      },
      {
        role: 'bot',
        message: 'Certainly! The Kalalau Trail on the island of Kauai is one of the most beautiful and challenging hikes in Hawaii. It offers stunning views of the Na Pali Coast and takes you through lush valleys and along towering sea cliffs.',
        timestamp: '10:05 AM',
      },
      {
        role: 'user',
        message: 'What about snorkeling spots?',
        timestamp: '10:06 AM',
      },
      {
        role: 'bot',
        message: 'Hanauma Bay on Oahu is one of the best snorkeling spots in Hawaii. It\'s a protected marine life conservation area with clear waters and abundant marine life. Another great spot is Molokini Crater off the coast of Maui.',
        timestamp: '10:07 AM',
      },
      {
        role: 'user',
        message: 'Is it safe to swim in the ocean there?',
        timestamp: '10:08 AM',
      },
      {
        role: 'bot',
        message: 'Yes, it\'s generally safe to swim in the ocean in Hawaii. However, always pay attention to local warnings and conditions, as strong currents and waves can occur. It\'s best to swim at beaches with lifeguards and follow their advice.',
        timestamp: '10:09 AM',
      },
    ],
  },
  {
    id: '2',
    name: 'Tell me about the best places to visit in the world',
    userId: '1',
    messages: [
      {
        role: 'user',
        message: 'Tell me about the best places to visit in the world',
        timestamp: '11:00 AM',
      },
      {
        role: 'bot',
        message: 'There are so many incredible places to visit around the world! Some of the top destinations include Paris, known for its art, culture, and cuisine; Tokyo, famous for its technology, fashion, and food; and New York City, known for its vibrant culture and iconic landmarks.',
        timestamp: '11:01 AM',
      },
      {
        role: 'user',
        message: 'What makes Paris a must-visit destination?',
        timestamp: '11:02 AM',
      },
      {
        role: 'bot',
        message: 'Paris is renowned for its romantic ambiance, historic architecture, and world-class museums like the Louvre and Musée d\'Orsay. Visitors also love the charming cafes, beautiful gardens like Luxembourg Gardens, and landmarks such as the Eiffel Tower and Notre-Dame Cathedral.',
        timestamp: '11:03 AM',
      },
      {
        role: 'user',
        message: 'What about Tokyo?',
        timestamp: '11:04 AM',
      },
      {
        role: 'bot',
        message: 'Tokyo is a city where traditional meets modern. It offers cutting-edge technology, bustling shopping districts like Shibuya and Akihabara, and serene temples and gardens. Don\'t miss the amazing food scene, from sushi to ramen, and the unique cultural experiences like sumo wrestling and tea ceremonies.',
        timestamp: '11:05 AM',
      },
      {
        role: 'user',
        message: 'Is New York City worth visiting?',
        timestamp: '11:06 AM',
      },
      {
        role: 'bot',
        message: 'Absolutely! New York City is known for its energy and diversity. You can visit world-famous landmarks like Times Square, Central Park, and the Statue of Liberty. The city is also a hub for arts and entertainment, with Broadway shows, museums like the Metropolitan Museum of Art, and a thriving music and nightlife scene.',
        timestamp: '11:07 AM',
      },
      {
        role: 'user',
        message: 'Are there any other places you recommend?',
        timestamp: '11:08 AM',
      },
      {
        role: 'bot',
        message: 'Yes, other must-visit places include Rome for its ancient history and architecture, Sydney for its beautiful harbor and beaches, and Cape Town for its stunning landscapes and rich culture. Each of these cities offers unique experiences and attractions.',
        timestamp: '11:09 AM',
      },
    ],
  },
  {
    id: '3',
    name: 'What are some healthy meal prep ideas?',
    userId: ' 1',
    messages: [
      {
        role: 'user',
        message: 'What are some healthy meal prep ideas?',
        timestamp: '12:00 PM',
      },
      {
        role: 'bot',
        message: 'Healthy meal prep ideas include preparing balanced meals with a good mix of protein, vegetables, and whole grains. For example, you could make grilled chicken with quinoa and roasted vegetables, or a salad with mixed greens, chickpeas, avocado, and a vinaigrette dressing.',
        timestamp: '12:01 PM',
      },
      {
        role: 'user',
        message: 'Can you suggest a vegetarian meal?',
        timestamp: '12:02 PM',
      },
      {
        role: 'bot',
        message: 'Sure! A great vegetarian meal prep idea is a Buddha bowl. You can include quinoa or brown rice, roasted sweet potatoes, chickpeas, avocado, steamed broccoli, and a tahini dressing. It\'s nutritious and delicious!',
        timestamp: '12:03 PM',
      },
      {
        role: 'user',
        message: 'How about a breakfast option?',
        timestamp: '12:04 PM',
      },
      {
        role: 'bot',
        message: 'Overnight oats are an excellent breakfast option. You can prepare them with rolled oats, almond milk, chia seeds, and your choice of fruits and nuts. Let it sit in the fridge overnight, and you\'ll have a ready-to-eat, healthy breakfast in the morning.',
        timestamp: '12:05 PM',
      },
      {
        role: 'user',
        message: 'Any ideas for snacks?',
        timestamp: '12:06 PM',
      },
      {
        role: 'bot',
        message: 'Healthy snacks include hummus with carrot and cucumber sticks, Greek yogurt with berries, or a handful of nuts and seeds. These snacks are easy to prepare and provide a good balance of nutrients to keep you energized throughout the day.',
        timestamp: '12:07 PM',
      },
      {
        role: 'user',
        message: 'Can you suggest a meal prep for weight loss?',
        timestamp: '12:08 PM',
      },
      {
        role: 'bot',
        message: 'For weight loss, consider preparing meals that are high in protein and fiber to keep you full. Grilled salmon with steamed asparagus and a side of mixed greens is a great option. You can also try a stir-fry with tofu, broccoli, bell peppers, and snap peas over brown rice.',
        timestamp: '12:09 PM',
      },
    ],
  },
  {
    id: '4',
    name: 'What are the benefits of meditation?',
    userId: '1',
    messages: [
      {
        role: 'user',
        message: 'What are the benefits of meditation?',
        timestamp: '1:00 PM',
      },
      {
        role: 'bot',
        message: 'Meditation has numerous benefits for both the mind and body. It can reduce stress, anxiety, and depression, improve focus and concentration, and promote emotional well-being. Regular meditation practice has been shown to lower blood pressure, improve sleep, and boost overall mental and physical health.',
        timestamp: '1:01 PM',
      },
      {
        role: 'user',
        message: 'How does meditation reduce stress?',
        timestamp: '1:02 PM',
      },
      {
        role: 'bot',
        message: 'Meditation helps reduce stress by calming the mind and promoting relaxation. It allows you to focus on the present moment and let go of worries and distractions. By practicing mindfulness and deep breathing techniques, you can lower your stress levels and cultivate a sense of inner peace and tranquility.',
        timestamp: '1:03 PM',
      },
      {
        role: 'user',
        message: 'Can meditation improve mental clarity?',
        timestamp: '1:04 PM',
      },
      {
        role: 'bot',
        message: 'Yes, meditation can improve mental clarity by enhancing focus, concentration, and cognitive function. Regular meditation practice can sharpen your mind, increase awareness, and help you think more clearly and creatively. It can also reduce mental fatigue and improve memory and decision-making skills.',
        timestamp: '1:05 PM',
      },
      {
        role: 'user',
        message: 'How does meditation benefit physical health?',
        timestamp: '1:06 PM',
      },
      {
        role: 'bot',
        message: 'Meditation benefits physical health by reducing inflammation, boosting the immune system, and promoting relaxation. It can lower cortisol levels, improve heart health, and enhance overall well-being. Meditation has also been shown to reduce pain, improve digestion, and support healthy aging.',
        timestamp: '1:07 PM',
      },
      {
        role: 'user',
        message: 'Are there different types of meditation?',
        timestamp: '1:08 PM',
      },
      {
        role: 'bot',
        message: 'Yes, there are many types of meditation practices, including mindfulness meditation, loving-kindness meditation, transcendental meditation, and guided visualization. Each type has its own techniques and benefits, so you can explore different styles to find what works best for you.',
        timestamp: '1:09 PM',
      },
    ],
  },
  {
    id: '5',
    name: 'What are the benefits of regular exercise?',
    userId: '1',
    messages: [
      {
        role: 'user',
        message: 'What are the benefits of regular exercise?',
        timestamp: '2:00 PM',
      },
      {
        role: 'bot',
        message: 'Regular exercise has numerous benefits for both the body and mind. It can improve cardiovascular health, strengthen muscles and bones, and boost energy levels. Exercise also helps reduce the risk of chronic diseases like heart disease, diabetes, and obesity, and can enhance mental well-being and cognitive function.',
        timestamp: '2:01 PM',
      },
      {
        role: 'user',
        message: 'How does exercise improve cardiovascular health?',
        timestamp: '2:02 PM',
      },
      {
        role: 'bot',
        message: 'Exercise improves cardiovascular health by strengthening the heart and lungs, increasing circulation, and lowering blood pressure and cholesterol levels. Regular physical activity can reduce the risk of heart disease, stroke, and other cardiovascular conditions, and improve overall heart function and efficiency.',
        timestamp: '2:03 PM',
      },
      {
        role: 'user',
        message: 'Can exercise help with weight management?',
        timestamp: '2:04 PM',
      },
      {
        role: 'bot',
        message: 'Yes, exercise is essential for weight management and maintaining a healthy body weight. It helps burn calories, build muscle mass, and boost metabolism, which can aid in weight loss and prevent weight gain. Combining regular exercise with a balanced diet is key to achieving and maintaining a healthy weight.',
        timestamp: '2:05 PM',
      },
      {
        role: 'user',
        message: 'How does exercise benefit mental health?',
        timestamp: '2:06 PM',
      },
      {
        role: 'bot',
        message: 'Exercise benefits mental health by reducing stress, anxiety, and depression, and improving mood and self-esteem. Physical activity releases endorphins, the body\'s feel-good hormones, which can help alleviate symptoms of depression and boost overall emotional well-being. Regular exercise can also enhance cognitive function and reduce the risk of cognitive decline.',
        timestamp: '2:07 PM',
      },
      {
        role: 'user',
        message: 'What are some types of exercise to try?',
        timestamp: '2:08 PM',
      },
    ]
  }
];

export const user = {
  id: 1,
  name: 'John Doe',
  email: 'email@example.com',
}