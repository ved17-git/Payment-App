"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ServerCrash, RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 py-8 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4">
                <Badge variant="destructive" className="w-fit gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Service Unavailable
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  Oops! Our Server
                  <span className="text-primary"> Is Taking</span>
                  <br />A Quick Break
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  We are experiencing some technical difficulties. Our team has been notified and is working to restore
                  service as quickly as possible.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="gap-2 w-full sm:w-auto" onClick={reset}>
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative z-10 w-full max-w-sm">
                <Card className="bg-gradient-to-br from-destructive/10 to-orange-500/10 border-destructive/20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ServerCrash className="h-5 w-5 text-destructive" />
                      Server Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-2xl sm:text-3xl font-bold text-destructive">Offline</div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <span className="text-sm font-medium">EC2 Instance</span>
                        <Badge variant="destructive" className="text-xs">
                          Down
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <span className="text-sm font-medium">API Gateway</span>
                        <Badge variant="secondary" className="text-xs">
                          Pending
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <span className="text-sm font-medium">Database</span>
                        <Badge className="bg-green-100 text-green-600 text-xs hover:bg-green-100">Healthy</Badge>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Recovery</span>
                        <span className="text-orange-600 font-medium">~5 minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 to-orange-500/20 rounded-full blur-3xl -z-10 transform scale-110"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
