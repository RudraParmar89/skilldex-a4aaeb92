import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, ArrowLeft, User, Camera, Loader2, Save } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function Profile() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth')
  }, [user, authLoading, navigate])

  useEffect(() => {
    if (!user) return
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) {
        setFullName(data.full_name || '')
        setUsername(data.username || '')
        setAvatarUrl(data.avatar_url || '')
      }
      if (error) console.error(error)
      setLoading(false)
    }
    fetchProfile()
  }, [user])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
      if (error) throw error

      await supabase.auth.updateUser({ data: { full_name: fullName } })
      toast.success('Profile updated!')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-lg mx-auto"
      >
        <div className="text-center mb-8">
          <div
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer mb-6"
          >
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-foreground text-xl tracking-tight">SkillDex</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account details</p>
        </div>

        <div className="bg-card rounded-2xl clean-border card-shadow p-8 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-foreground" />
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                placeholder="johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Avatar URL</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={e => setAvatarUrl(e.target.value)}
                className="w-full px-4 py-2.5 bg-input rounded-lg border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                placeholder="https://example.com/avatar.png"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full gradient-bg text-primary-foreground font-semibold py-2.5 rounded-lg hover:opacity-90 gentle-animation cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground gentle-animation cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>
      </motion.div>
    </div>
  )
}
