/* eslint-disable no-console */
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { Button } from 'antd'
import { getProfileRequest, saveProfileRequest, setProfileRequest } from '@/services/profile'
import './profile.less'
const Profile = (): ReactElement => {
  const [content, setContent] = useState<string>('')
  const [profileId, setProfileId] = useState<number | undefined>()
  const mdParser = new MarkdownIt(/* Markdown-it options */)
  useEffect(() => {
    getProfile()
  }, [])
  async function saveProfile(): Promise<void> {
    if (profileId) {
      const res = await setProfileRequest({ profileId, content })
      console.log({ res })
    }
    else {
      const userId = JSON.parse(localStorage.getItem('user') ?? '{}').userId
      await saveProfileRequest({
        userId,
        content,
      })
    }
  }
  async function getProfile(): Promise<void> {
    const userId = JSON.parse(localStorage.getItem('user') ?? '{}').userId
    const res = await getProfileRequest(userId)
    console.log({ res })
    setProfileId(res.data?.profileId)
    setContent(res.data?.content as string)
  }

  function handleEditorChange(res: {
    text: string
    html: string
  }) {
    setContent(res.text)
    console.log('handleEditorChange', res)
  }
  return (
    <div>
      <MdEditor value={content} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
      <div className='save-profile' >
        <Button onClick={saveProfile} >保存简介</Button>
      </div>
    </div>
  )
}

export default Profile
