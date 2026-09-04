import React from 'react'

export const CaloricDeficit = () => {
  return (
    <div className=''>
      <h1 className='text-center text-3xl font-bold'>Caloric Deficit</h1>
      <div className='py-4 px-4' >
        <img src="/deficit.png" alt="" className='w-full max-w-md mx-auto rounded-xl' />
      </div>
      <h2 className='text-center font-semibold text-2xl py-4'>Meals</h2>


      {/* BreakFast */}
      <h3 className='font-semibold text-lg mt-8 mb-3'>Breakfast</h3>

      <div className="overflow-x-auto rounded-xl border border-line bg-raised">
<table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-sunken text-ink">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Breakfast</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>

          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Monday</td>
            <td className="px-4 py-2 text-ink">Eggs + Oat + Fruit</td>
            <td className="px-4 py-2 text-ink">3 whole eggs, 25g oat and 1/2 banana</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Tuesday</td>
            <td className="px-4 py-2 text-ink">Omelette with vegetables and whole bread</td>
            <td className="px-4 py-2 text-ink">2 eggs,spinach, onion, 1 whole bread </td>
          </tr><tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Wednesday</td>
            <td className="px-4 py-2 text-ink">Bread with egg and natural yogurt </td>
            <td className="px-4 py-2 text-ink">2 whole eggs, 1 whole bread and 1 skimmed yogurt </td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Thursday</td>
            <td className="px-4 py-2 text-ink">Toast with avocado and egg</td>
            <td className="px-4 py-2 text-ink">1 whole egg, 1/2 avocado and 2 whole toast</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Friday</td>
            <td className="px-4 py-2 text-ink">Porridge protein</td>
            <td className="px-4 py-2 text-ink">30g oat, 150ml skimmed milk, 1 whole egg, 1/2 scoop protein or yogurt</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Saturday</td>
            <td className="px-4 py-2 text-ink">Eggs and fruit</td>
            <td className="px-4 py-2 text-ink">2 whole eggs and 1 apple</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Sunday</td>
            <td className="px-4 py-2 text-ink">Eggs,bread and fruit</td>
            <td className="px-4 py-2 text-ink">3 whole eggs, 1 toast and 1 fruit</td>
          </tr>

        </tbody>
      </table>
</div>

      {/* Lunch */}
      <h3 className='font-semibold text-lg mt-8 mb-3'>Lunch</h3>

      <div className="overflow-x-auto rounded-xl border border-line bg-raised">
<table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-sunken text-ink">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Meal</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>

          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Monday</td>
            <td className="px-4 py-2 text-ink">Grilled chicken with brown rice and broccoli</td>
            <td className="px-4 py-2 text-ink">120 g chicken breast, 60 g cooked brown rice, steamed broccoli</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Tuesday</td>
            <td className="px-4 py-2 text-ink">Potato and egg omelet + salad</td>
            <td className="px-4 py-2 text-ink">2 eggs, 150 g potato, onion, tomato, lettuce</td>
          </tr><tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Wednesday</td>
            <td className="px-4 py-2 text-ink">Tuna and veggie bowl </td>
            <td className="px-4 py-2 text-ink">1 can tuna in water, ½ avocado, tomato, grated carrot</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Thursday</td>
            <td className="px-4 py-2 text-ink">Chicken and veggie stir-fry</td>
            <td className="px-4 py-2 text-ink">120 g chicken, bell pepper, onion, zucchini, 1 tbsp olive oil</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Friday</td>
            <td className="px-4 py-2 text-ink">Whole grain pasta with natural sauce and boiled egg</td>
            <td className="px-4 py-2 text-ink">70 g whole grain pasta, homemade tomato sauce, 1 boiled egg</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Saturday</td>
            <td className="px-4 py-2 text-ink">Homemade veggie and egg tart</td>
            <td className="px-4 py-2 text-ink">Whole wheat crust, 2 eggs, spinach or chard, light ricotta</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Sunday</td>
            <td className="px-4 py-2 text-ink">Homemade burger + fresh salad</td>
            <td className="px-4 py-2 text-ink">120 g lean beef, 1 whole grain bun, lettuce, tomato</td>
          </tr>

        </tbody>
      </table>
</div>


      {/* Snack */}
      <h3 className='font-semibold text-lg mt-8 mb-3'>Snack</h3>

      <div className="overflow-x-auto rounded-xl border border-line bg-raised">
<table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-sunken text-ink">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Snack</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>

          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Monday</td>
            <td className="px-4 py-2 text-ink">Yogurt with oats and banana</td>
            <td className="px-4 py-2 text-ink">1 low-fat yogurt, 25 g oats, ½ banana</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Tuesday</td>
            <td className="px-4 py-2 text-ink">Toast with scrambled eggs</td>
            <td className="px-4 py-2 text-ink">2 whole grain toasts, 2 eggs</td>
          </tr><tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Wednesday</td>
            <td className="px-4 py-2 text-ink">Natural protein smoothie </td>
            <td className="px-4 py-2 text-ink">1 banana, 1 pasteurized egg or 1 yogurt, ½ scoop protein</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Thursday</td>
            <td className="px-4 py-2 text-ink">Oat and egg cookies</td>
            <td className="px-4 py-2 text-ink">1 egg, 40 g oats, stevia or honey</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Friday</td>
            <td className="px-4 py-2 text-ink">Avocado toast with boiled egg</td>
            <td className="px-4 py-2 text-ink">½ avocado, 1 whole grain toast, 1 egg</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Saturday</td>
            <td className="px-4 py-2 text-ink">Berry yogurt smoothie</td>
            <td className="px-4 py-2 text-ink">Low-fat yogurt, frozen mixed berries</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Sunday</td>
            <td className="px-4 py-2 text-ink">Coffee with milk + toast with ricotta</td>
            <td className="px-4 py-2 text-ink">200 ml skim milk, 1 toast, 2 tbsp light ricotta</td>
          </tr>

        </tbody>
      </table>
</div>

      {/* Dinner */}
      <h3 className='font-semibold text-lg mt-8 mb-3'>Dinner</h3>

<div className="overflow-x-auto rounded-xl border border-line bg-raised mb-8">
<table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-sunken text-ink">
            <th className="px-4 py-2 text-left">Day</th>
            <th className="px-4 py-2 text-left">Dinner</th>
            <th className="px-4 py-2 text-left">Ingredients</th>
          </tr>
        </thead>
        <tbody>

          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Monday</td>
            <td className="px-4 py-2 text-ink">Full omelet with veggies</td>
            <td className="px-4 py-2 text-ink">3 eggs, onion, spinach, tomato</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Tuesday</td>
            <td className="px-4 py-2 text-ink">Fish filet + pumpkin mash</td>
            <td className="px-4 py-2 text-ink">150 g hake or white fish, 150 g pumpkin</td>
          </tr><tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Wednesday</td>
            <td className="px-4 py-2 text-ink">Chicken and egg salad</td>
            <td className="px-4 py-2 text-ink">100 g chicken, 2 eggs, lettuce, tomato</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Thursday</td>
            <td className="px-4 py-2 text-ink">Egg stir-fry with rice and veggies</td>
            <td className="px-4 py-2 text-ink">2 eggs, ½ cup rice, sautéed vegetables</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Friday</td>
            <td className="px-4 py-2 text-ink">Avocado toast with fried egg</td>
            <td className="px-4 py-2 text-ink">2 whole grain toasts, 1 egg, ½ avocado</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Saturday</td>
            <td className="px-4 py-2 text-ink">Tuna tart + side salad</td>
            <td className="px-4 py-2 text-ink">Slice of tart (egg + tuna + veggies), tomato, arugula</td>
          </tr>
          <tr className="border-b border-line">
            <td className="px-2 py-2 text-ink ">Sunday</td>
            <td className="px-4 py-2 text-ink">Vegetable soup + boiled eggs</td>
            <td className="px-4 py-2 text-ink">Veggie broth, carrot, pumpkin, 2 boiled eggs</td>
          </tr>

        </tbody>
      </table>
</div>
    </div>
  )
}