# Component Library

Quick reference for all reusable components in the idevelop.tech application. For detailed prop documentation, see the component source files.

> **📘 Component Creation Rule**: If you create the same UI pattern 2-3+ times, extract it into a component. See [COMPONENT-RULES.md](./COMPONENT-RULES.md) for details.

---

## Elements

| Sub-Category    | Component                                                                     | Purpose                                                          |
| --------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Buttons**     | [PrimaryButton](../src/components/elements/buttons/PrimaryButton.vue)         | Solid gradient CTA buttons for primary actions                   |
| **Buttons**     | [PrimaryRouterLink](../src/components/elements/buttons/PrimaryRouterLink.vue) | Primary button styled as router-link (no double-tab issue)       |
| **Buttons**     | [OutlineButton](../src/components/elements/buttons/OutlineButton.vue)         | Outline style buttons for click actions (router.back, etc.)      |
| **Buttons**     | [OutlineRouterLink](../src/components/elements/buttons/OutlineRouterLink.vue) | Outline button styled as router-link (no double-tab issue)       |
| **Buttons**     | [IconButton](../src/components/elements/buttons/IconButton.vue)               | Circular buttons for close/back navigation                       |
| **Badges**      | [Badge](../src/components/elements/badges/Badge.vue)                          | Small tag pills for skills, technologies, or categories          |
| **Badges**      | [IconBadge](../src/components/elements/badges/IconBadge.vue)                  | Circular containers for icons/emojis with background colors      |
| **Interactive** | [TypewriterText](../src/components/elements/interactive/TypewriterText.vue)   | Animated typewriter effect that cycles through phrases           |
| **Text**        | [GradientText](../src/components/elements/GradientText.vue)                   | Text with cyan-to-purple gradient (cyan-400→cyan-300→purple-400) |
| **Utility**     | [CheckItem](../src/components/elements/CheckItem.vue)                         | Checkmark list items for feature/achievement lists               |
| **Utility**     | [ContactInfoItem](../src/components/elements/ContactInfoItem.vue)             | Contact information rows with icon badges and labels             |
| **Utility**     | [SocialIcon](../src/components/elements/SocialIcon.vue)                       | Social media icon links                                          |
| **Utility**     | [LoadingSpinner](../src/components/elements/LoadingSpinner.vue)               | Animated loading spinner with optional message                   |
| **Utility**     | [NumberedStep](../src/components/elements/NumberedStep.vue)                   | Numbered step item for sequential lists and processes            |
| **Utility**     | [SimpleCheckItem](../src/components/elements/SimpleCheckItem.vue)             | Simple checkmark list item for feature lists                     |

---

## Cards

| Component                                                          | Purpose                                                        |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| [ServiceCard](../src/components/cards/ServiceCard.vue)             | Service offering cards with hero images, stats, and tags       |
| [InfoCard](../src/components/cards/InfoCard.vue)                   | Wrapper cards with optional title and icon for grouped content |
| [PortfolioItem](../src/components/cards/PortfolioItem.vue)         | Portfolio work items with logo, description, and external link |
| [AttributionCard](../src/components/cards/AttributionCard.vue)     | Image attribution cards for photographer credits               |
| [BenefitCard](../src/components/cards/BenefitCard.vue)             | Benefit/feature cards with icons and descriptions              |
| [SimpleTestimonial](../src/components/cards/SimpleTestimonial.vue) | Testimonial cards for client feedback                          |

---

## UI Components

| Component                                                             | Purpose                                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [PanelSidebar](../src/components/ui/PanelSidebar.vue)                 | Fixed sidebar panel for service/tech detail navigation             |
| [PanelContent](../src/components/ui/PanelContent.vue)                 | Responsive content panel for displaying selected section details   |
| [SelectableItem](../src/components/ui/SelectableItem.vue)             | Selectable list items with hover and active states                 |
| [BreadcrumbNav](../src/components/ui/BreadcrumbNav.vue)               | Breadcrumb navigation for service pages                            |
| [ServiceSection](../src/components/ui/ServiceSection.vue)             | Unified section component with multiple variants for service pages |
| [CTASection](../src/components/ui/CTASection.vue)                     | Call-to-action section for service pages                           |
| [CTAForm](../src/components/ui/CTAForm.vue)                           | Contact form component for call-to-action sections                 |
| [TabButton](../src/components/ui/TabButton.vue)                       | Tab button for tabbed navigation interfaces                        |
| [TwoColumnListSection](../src/components/ui/TwoColumnListSection.vue) | Two-column list section with check items or numbered steps         |
| [FloatingActionBar](../src/components/ui/FloatingActionBar.vue)       | Floating action bar for mobile navigation                          |

---

## Display Components

| Component                                                  | Purpose                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| [Timeline](../src/components/display/Timeline.vue)         | Vertical timeline with connecting line for sequential steps          |
| [IconFlowStep](../src/components/display/IconFlowStep.vue) | Icon box step for horizontal process flows with configurable filters |

---

## Layout Components

| Component                                             | Purpose                                                           |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| [Navigation](../src/components/layout/Navigation.vue) | Global site navigation with mobile menu and dynamic color theming |
| [Footer](../src/components/layout/Footer.vue)         | Site footer with social links, navigation, and copyright          |

---

## Integration Components

| Component                                                                        | Purpose                                                           |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [SystemBox](../src/components/integration/SystemBox.vue)                         | Visual box representing a system/platform in integration diagrams |
| [EntityMappingFlow](../src/components/integration/EntityMappingFlow.vue)         | Visual arrow showing entity mapping between systems               |
| [DetailedEntityMapping](../src/components/integration/DetailedEntityMapping.vue) | Detailed entity mapping with multiple field mappings              |
| [IntegrationDiagram](../src/components/integration/IntegrationDiagram.vue)       | Complete integration diagram with systems and mappings            |
