"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {  ArrowRight, Send, Wallet } from "lucide-react"
import Link from "next/link"



export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 px-4 py-8 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                   Now Available Worldwide
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  Send Money
                  <span className="text-primary"> Instantly</span>
                  <br />
                  Anywhere in the World
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  The fastest, most secure way to send and receive money. Join millions who trust Paytm.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/signUp">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>

            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 w-full max-w-sm">
                <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Wallet className="h-5 w-5" />
                      Your Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl sm:text-3xl font-bold">$2,450.75</div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-green-100 text-green-600 text-xs">AJ</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Alice Johnson</span>
                        </div>
                        <Button size="sm" className="gap-1 h-7 px-3">
                          <Send className="h-3 w-3" />
                          Pay
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">BS</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Bob Smith</span>
                        </div>
                        <Button size="sm" className="gap-1 h-7 px-3">
                          <Send className="h-3 w-3" />
                          Pay
                        </Button>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Recent Activity</span>
                        <span className="text-green-600 font-medium">+$150.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl -z-10 transform scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
