import React from 'react'

export const Maintenance = () => {
  return (
    <div>

      <h1 className='text-center text-3xl font-bold'>Maintenance</h1>
      <div className='py-4 px-4'>
        <img src="maintenance.png" alt="Maintenance" className='' />
      </div>
      <h2 className='text-center font-semibold text-2xl py-4'>Meals</h2>

      {/* Breakfast */}
      <h3 className='font-semibold py-2 px-2 border-1 rounded-lg'>Breakfast</h3>

      <table className="w-full border-collapse border-black">
        <thead>
          <tr className="dark:bg-black bg-[#0202FF] text-white">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Breakfast</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Monday</td>
            <td className="px-4 py-2">Omelette with oats and fruit</td>
            <td className="px-4 py-2">3 eggs, 30g oats, 1 banana</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Whole bread with avocado and yogurt</td>
            <td className="px-4 py-2">2 slices whole bread, ½ avocado, 1 low-fat yogurt</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Scrambled eggs + fruit + oats</td>
            <td className="px-4 py-2">3 eggs, 20g oats, 1 apple</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Whole bread toast with peanut butter and banana</td>
            <td className="px-4 py-2">2 slices toast, 1 tbsp peanut butter, ½ banana</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Protein porridge</td>
            <td className="px-4 py-2">40g oats, 200ml milk, 1 egg, ½ scoop protein</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Egg sandwich with tomato</td>
            <td className="px-4 py-2">2 eggs, 2 slices whole bread, tomato slices</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Yogurt with fruits and granola</td>
            <td className="px-4 py-2">150g yogurt, mixed fruits, 25g granola</td>
          </tr>
        </tbody>
      </table>

      {/* Lunch */}
      <h3 className='font-semibold py-2 px-2 border-1 rounded-lg mt-6'>Lunch</h3>

      <table className="w-full border-collapse border-black">
        <thead>
          <tr className="dark:bg-black bg-[#0202FF] text-white">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Meal</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Monday</td>
            <td className="px-4 py-2">Grilled chicken with rice and vegetables</td>
            <td className="px-4 py-2">150g chicken, 80g rice, carrots, broccoli</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Whole pasta with tuna and veggies</td>
            <td className="px-4 py-2">80g whole pasta, 1 tuna can, tomato, onion</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Chicken stir-fry with potatoes</td>
            <td className="px-4 py-2">120g chicken, 200g potato, onion, bell pepper</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Homemade burger with salad</td>
            <td className="px-4 py-2">150g lean meat, 1 bun, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Rice bowl with egg and avocado</td>
            <td className="px-4 py-2">½ cup rice, 2 eggs, ½ avocado</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Veggie and egg tart</td>
            <td className="px-4 py-2">2 eggs, spinach or chard, whole crust</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Grilled fish with mashed potatoes</td>
            <td className="px-4 py-2">150g fish, 150g potatoes, olive oil</td>
          </tr>
        </tbody>
      </table>

      {/* Snack */}
      <h3 className='font-semibold py-2 px-2 border-1 rounded-lg mt-6'>Snack</h3>

      <table className="w-full border-collapse border-black">
        <thead>
          <tr className="dark:bg-black bg-[#0202FF] text-white">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Snack</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Monday</td>
            <td className="px-4 py-2">Yogurt with oats and apple</td>
            <td className="px-4 py-2">1 yogurt, 25g oats, 1 apple</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Toast with ricotta and tomato</td>
            <td className="px-4 py-2">2 toasts, 2 tbsp ricotta, tomato slices</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Protein smoothie</td>
            <td className="px-4 py-2">1 banana, ½ scoop protein, milk</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Oat and banana pancakes</td>
            <td className="px-4 py-2">1 banana, 1 egg, 40g oats</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Coffee with milk and toast</td>
            <td className="px-4 py-2">200ml milk, 2 toasts, 1 tbsp peanut butter</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Fruit and nut bowl</td>
            <td className="px-4 py-2">Mixed fruits, 15g nuts</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Yogurt with granola</td>
            <td className="px-4 py-2">150g yogurt, 25g granola</td>
          </tr>
        </tbody>
      </table>

      {/* Dinner */}
      <h3 className='font-semibold py-2 px-2 border-1 rounded-lg mt-6'>Dinner</h3>

      <table className="w-full border-collapse border-black mb-8">
        <thead>
          <tr className="dark:bg-black bg-[#0202FF] text-white">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Dinner</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Monday</td>
            <td className="px-4 py-2">Omelet with chicken and vegetables</td>
            <td className="px-4 py-2">2 eggs, 100g chicken, onion, spinach</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Tuna salad with boiled egg</td>
            <td className="px-4 py-2">1 tuna can, 1 egg, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Grilled fish with rice</td>
            <td className="px-4 py-2">150g fish, ½ cup rice, lemon</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Chicken with mashed pumpkin</td>
            <td className="px-4 py-2">120g chicken, 150g pumpkin</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Eggs with avocado toast</td>
            <td className="px-4 py-2">2 eggs, 2 toasts, ½ avocado</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Tart with salad</td>
            <td className="px-4 py-2">Egg + veggie tart, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Vegetable soup with boiled egg</td>
            <td className="px-4 py-2">Soup, carrot, pumpkin, 2 eggs</td>
          </tr>
        </tbody>
      </table>


    </div>
  )
}
