import { SMART_PEOPLE } from '../data/smartPeople'

export function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  return (
    <section aria-labelledby="directory-title">
      <h2 id="directory-title">Scientist & Pioneer Directory</h2>

      <ul>
        {initialData.map((person) => (
          <li key={person.id}>
            {person.name} - Age {person.age} - IQ {person.iq}
          </li>
        ))}
      </ul>
    </section>
  )
}