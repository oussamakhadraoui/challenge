import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const bioMaxLength = 300
export const responsibilityMaxLength = 300

interface ExperienceShape {
  link: string
  type: string
}

export interface ApplicationFormShape {

  experience: ExperienceShape[]
}

const schema = yup.object({
  experience: yup
    .array()
    .of(
      yup.object({
        link: yup.string().min(4).required(),
        type: yup.string().min(4).required(),

      })
    )
    .required(),
})

export const emptyExperience: ExperienceShape = {
  link: '',
  type: '',
}

export const useApplicationForm = () => {
  return useForm<ApplicationFormShape>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      experience: [emptyExperience],
    },
  })
}
