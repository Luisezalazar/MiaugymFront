import React from 'react'

export const CaloricDeficit = () => {
  return (
    <div className=''>
      <h1 className='text-center text-3xl font-bold'>Caloric Deficit</h1>
      <div className='py-4 px-4' >
        <img src="deficit.png" alt="" className='' />
      </div>
      <h2 className='text-center font-semibold text-2xl py-4'>Meals</h2>


      {/* BreakFast */}
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
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Monday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Eggs + Oat + Fruit</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">3 whole eggs, 25g oat and 1/2 banana</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Tuesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Omelette with vegetables and whole bread</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 eggs,spinach, onion, 1 whole bread </td>
          </tr><tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Wednesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Bread with egg and natural yogurt </td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 whole eggs, 1 whole bread and 1 skimmed yogurt </td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Thursday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Toast with avocado and egg</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">1 whole egg, 1/2 avocado and 2 whole toast</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Friday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Porridge protein</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">30g oat, 150ml skimmed milk, 1 whole egg, 1/2 scoop protein or yogurt</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Saturday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Eggs and fruit</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 whole eggs and 1 apple</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Sunday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Eggs,bread and fruit</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">3 whole eggs, 1 toast and 1 fruit</td>
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
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Monday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Grilled chicken with brown rice and broccoli</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">120 g chicken breast, 60 g cooked brown rice, steamed broccoli</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Tuesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Potato and egg omelet + salad</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 eggs, 150 g potato, onion, tomato, lettuce</td>
          </tr><tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Wednesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Tuna and veggie bowl </td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">1 can tuna in water, ½ avocado, tomato, grated carrot</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Thursday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Chicken and veggie stir-fry</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">120 g chicken, bell pepper, onion, zucchini, 1 tbsp olive oil</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Friday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Whole grain pasta with natural sauce and boiled egg</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">70 g whole grain pasta, homemade tomato sauce, 1 boiled egg</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Saturday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Homemade veggie and egg tart</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Whole wheat crust, 2 eggs, spinach or chard, light ricotta</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Sunday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Homemade burger + fresh salad</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">120 g lean beef, 1 whole grain bun, lettuce, tomato</td>
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
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Monday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Yogurt with oats and banana</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">1 low-fat yogurt, 25 g oats, ½ banana</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Tuesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Toast with scrambled eggs</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 whole grain toasts, 2 eggs</td>
          </tr><tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Wednesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Natural protein smoothie </td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">1 banana, 1 pasteurized egg or 1 yogurt, ½ scoop protein</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Thursday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Oat and egg cookies</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">1 egg, 40 g oats, stevia or honey</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Friday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Avocado toast with boiled egg</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">½ avocado, 1 whole grain toast, 1 egg</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Saturday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Berry yogurt smoothie</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Low-fat yogurt, frozen mixed berries</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Sunday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Coffee with milk + toast with ricotta</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">200 ml skim milk, 1 toast, 2 tbsp light ricotta</td>
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
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Monday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Full omelet with veggies</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">3 eggs, onion, spinach, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Tuesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Fish filet + pumpkin mash</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">150 g hake or white fish, 150 g pumpkin</td>
          </tr><tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Wednesday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Chicken and egg salad</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">100 g chicken, 2 eggs, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Thursday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Egg stir-fry with rice and veggies</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 eggs, ½ cup rice, sautéed vegetables</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Friday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Avocado toast with fried egg</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">2 whole grain toasts, 1 egg, ½ avocado</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Saturday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Tuna tart + side salad</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Slice of tart (egg + tuna + veggies), tomato, arugula</td>
          </tr>
          <tr className="border-b border-gray-700">
            <td className="px-2 py-2 dark:text-gray-300 text-zinc-950 ">Sunday</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Vegetable soup + boiled eggs</td>
            <td className="px-4 py-2 dark:text-gray-300 text-zinc-950">Veggie broth, carrot, pumpkin, 2 boiled eggs</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}