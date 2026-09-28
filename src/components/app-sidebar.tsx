import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { ChevronDown, EyeIcon, FlameIcon, HomeIcon, NewspaperIcon } from 'lucide-react'
import { getPopularCommunities, getUserCommunities } from '@/lib/communities'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'

export async function AppSidebar() {
  const [communities, popularCommunities] = await Promise.all([
    getUserCommunities(),
    getPopularCommunities(),
  ])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="my-2">
            <SidebarMenuButton render={<Link href="/" />}>
              <HomeIcon />
              Home
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="my-2">
            <SidebarMenuButton render={<Link href="/popular" />}>
              <FlameIcon />
              Popular
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="my-2">
            <SidebarMenuButton render={<Link href="/news" />}>
              <NewspaperIcon />
              News
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="my-2">
            <SidebarMenuButton render={<Link href="/explore" />}>
              <EyeIcon />
              Explore
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel render={<CollapsibleTrigger />}>
              Your Communities
              <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {popularCommunities.length === 0 ? (
                  <p className="px-2 text-sm text-muted-foreground">
                    There are no communities yet.
                  </p>
                ) : (
                  <SidebarMenu>
                    {communities.map((community) => (
                      <SidebarMenuItem key={community.id} className="my-1.5">
                        <SidebarMenuButton
                          render={<Link href={community.slug} />}
                          className="flex justify-between">
                          <span>{community.name}</span>
                          <Image
                            src={community.communityLogo}
                            width="32"
                            height="32"
                            alt={`${community.name} logo`}
                            className="rounded-full"
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Separator />
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel render={<CollapsibleTrigger />}>
              Popular Communities
              <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                {popularCommunities.length === 0 ? (
                  <p className="px-2 text-sm text-muted-foreground">
                    There are no communities yet.
                  </p>
                ) : (
                  <SidebarMenu>
                    {popularCommunities.map((community) => (
                      <SidebarMenuItem key={community.id} className="my-1.5">
                        <SidebarMenuButton
                          render={<Link href={community.slug} />}
                          className="flex justify-between">
                          <span>{community.name}</span>
                          <Image
                            src={community.communityLogo}
                            width="32"
                            height="32"
                            alt={`${community.name} logo`}
                            className="rounded-full"
                          />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Username</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
