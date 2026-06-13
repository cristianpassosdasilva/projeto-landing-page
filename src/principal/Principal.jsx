import { registroSecoes } from '../registroSecoes'

export default function Principal({ sections }) {
  return (
    <main>
      {sections.map((section) => {
        const registryItem = registroSecoes[section.type]

        if (!registryItem || !section.enabled) {
          return null
        }

        const SectionComponent = registryItem.component
        return (
          <SectionComponent
            key={section.id}
            props={section.props}
            section={section}
          />
        )
      })}
    </main>
  )
}
