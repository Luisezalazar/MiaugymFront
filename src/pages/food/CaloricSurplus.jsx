import React from 'react'

export const CaloricSurplus = () => {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Caloric Surplus</h1>
      <div className='py-4 px-4'>
        <img src="superavit.png" alt="Caloric Surplus" className='' />
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
            <td className="px-4 py-2">Oats with milk, banana, and eggs</td>
            <td className="px-4 py-2">80g oats, 300ml milk, 1 banana, 3 eggs</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Avocado toast with eggs and juice</td>
            <td className="px-4 py-2">2 toasts, ½ avocado, 2 eggs, 1 orange juice</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Pancakes with peanut butter and milk</td>
            <td className="px-4 py-2">2 pancakes (oats + egg + banana), 1 tbsp peanut butter, 1 glass milk</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Oat bowl with honey and yogurt</td>
            <td className="px-4 py-2">70g oats, 1 tbsp honey, 1 yogurt, mixed fruit</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Scrambled eggs with bread and banana</td>
            <td className="px-4 py-2">3 eggs, 2 slices bread, 1 banana</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Oat porridge with fruit</td>
            <td className="px-4 py-2">60g oats, 250ml milk, apple, cinnamon</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">French toast with peanut butter</td>
            <td className="px-4 py-2">2 toasts, 2 eggs, 1 tbsp peanut butter</td>
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
            <td className="px-4 py-2">Grilled chicken with rice and olive oil</td>
            <td className="px-4 py-2">150g chicken, 100g rice, 1 tbsp olive oil, veggies</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Whole pasta with turkey and tomato</td>
            <td className="px-4 py-2">100g pasta, 120g turkey, tomato sauce, olive oil</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Beef with sweet potato and salad</td>
            <td className="px-4 py-2">150g beef, 150g sweet potato, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Chicken rice bowl with avocado</td>
            <td className="px-4 py-2">120g chicken, 100g rice, ½ avocado</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Salmon with quinoa and vegetables</td>
            <td className="px-4 py-2">150g salmon, 80g quinoa, broccoli</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Homemade burger with rice</td>
            <td className="px-4 py-2">150g beef, ½ cup rice, salad</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Chicken with mashed potatoes</td>
            <td className="px-4 py-2">150g chicken, 150g potatoes, olive oil</td>
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
            <td className="px-4 py-2">Yogurt with oats and nuts</td>
            <td className="px-4 py-2">1 yogurt, 30g oats, 15g nuts</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Protein shake</td>
            <td className="px-4 py-2">Milk, banana, 1 scoop protein, 20g oats</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Toast with peanut butter and fruit</td>
            <td className="px-4 py-2">2 toasts, 1 tbsp peanut butter, apple</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Yogurt with granola</td>
            <td className="px-4 py-2">150g yogurt, 25g granola</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Banana and almonds</td>
            <td className="px-4 py-2">1 banana, 15g almonds</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Cottage cheese with fruit</td>
            <td className="px-4 py-2">100g cottage cheese, pineapple or apple</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Protein bar and milk</td>
            <td className="px-4 py-2">1 protein bar, 1 glass milk</td>
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
            <td className="px-4 py-2">Chicken omelet with rice</td>
            <td className="px-4 py-2">3 eggs, 100g chicken, ½ cup rice</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Tuesday</td>
            <td className="px-4 py-2">Tuna salad with egg and bread</td>
            <td className="px-4 py-2">1 tuna can, 1 egg, 2 slices bread</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Wednesday</td>
            <td className="px-4 py-2">Beef with mashed potatoes</td>
            <td className="px-4 py-2">150g beef, 150g potatoes, olive oil</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Thursday</td>
            <td className="px-4 py-2">Chicken with sweet potato</td>
            <td className="px-4 py-2">120g chicken, 150g sweet potato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Friday</td>
            <td className="px-4 py-2">Eggs with avocado toast</td>
            <td className="px-4 py-2">3 eggs, 2 toasts, ½ avocado</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Saturday</td>
            <td className="px-4 py-2">Vegetable tart with chicken</td>
            <td className="px-4 py-2">Egg + veggie tart, 100g chicken</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2">Sunday</td>
            <td className="px-4 py-2">Rice with tuna and vegetables</td>
            <td className="px-4 py-2">½ cup rice, 1 tuna can, mixed vegetables</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
