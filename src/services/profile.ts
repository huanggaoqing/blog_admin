import { request } from '@umijs/max'

interface IProfileSaveParams {
  userId: number
  content: string
}

export function saveProfileRequest(params: IProfileSaveParams) {
  return request <API.LoginResult<string>>('/api/profile/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  })
}

export interface IProfileData {
  profileId: number
  userId: number
  content: string
  createTime: string
  updateTime: string
}

export function getProfileRequest(userId: string) {
  return request <API.LoginResult<IProfileData>>('/api/profile/get', {
    method: 'GET',
    params: {
      userId,
    },
  })
}

interface IProfileSetParams {
  profileId: number
  content: string
}

export function setProfileRequest(params: IProfileSetParams) {
  return request<API.LoginResult<number>>('/api/profile/set', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  })
}
