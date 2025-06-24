import React from 'react';
import { ListCheckIcon, RocketIcon, BriefcaseIcon, BuildingIcon, CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function PricingSection() {
    return (
        <section className="py-12">
            <div className="container mx-auto">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center mb-16">
                    <Badge className="text-xs font-medium uppercase">
                        <ListCheckIcon className="h-4 w-4 mr-2" />
                        Pricing
                    </Badge>
                    <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                        Choose the perfect plan for your needs
                    </h2>
                    <p className="text-muted-foreground lg:text-xl">
                        Start for free and scale as you grow. No hidden fees, cancel anytime.
                    </p>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
                    {/* Basic Plan */}
                    <Card className="relative flex flex-col justify-between border-border/50 transition-all hover:border-border hover:shadow-md">
                        <CardHeader className="space-y-4 pb-6">
                            <div className="flex items-center gap-2.5 text-muted-foreground">
                                <div className="grid size-8 shrink-0 place-content-center rounded-md border bg-background">
                                    <RocketIcon className="size-4" />
                                </div>
                                <h3 className="text-xl font-semibold tracking-tight">Basic Plan</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline font-bold">
                                    <span className="text-4xl tracking-tight">$19</span>
                                    <span className="text-lg text-muted-foreground font-medium">/month</span>
                                </div>
                                <p className="text-sm text-muted-foreground">or $199 yearly (save 15%)</p>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="flex-1 space-y-6">
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                                    Features Included
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Basic task management tools</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Calendar sync with limited integrations</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Access to 1 dashboard for tracking tasks</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Limited AI suggestions and insights</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Basic support and community access</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <Button variant="outline" className="w-full group mt-8">
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Business Plan - Popular */}
                    <Card className="relative flex flex-col justify-between border-primary/50 shadow-lg scale-105 transition-all hover:shadow-xl">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                        </div>
                        
                        <CardHeader className="space-y-4 pb-6">
                            <div className="flex items-center gap-2.5 text-muted-foreground">
                                <div className="grid size-8 shrink-0 place-content-center rounded-md border bg-background">
                                    <BriefcaseIcon className="size-4" />
                                </div>
                                <h3 className="text-xl font-semibold tracking-tight">Business Plan</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline font-bold">
                                    <span className="text-4xl tracking-tight">$29</span>
                                    <span className="text-lg text-muted-foreground font-medium">/month</span>
                                </div>
                                <p className="text-sm text-muted-foreground">or $299 yearly (save 15%)</p>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="flex-1 space-y-6">
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                                    Features Included
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">All Basic Plan features, plus:</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Unlimited task lists</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Advanced calendar sync</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">AI-driven insights</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Access to custom dashboards</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Priority email support</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <Button className="w-full group mt-8">
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="relative flex flex-col justify-between border-border/50 transition-all hover:border-border hover:shadow-md">
                        <CardHeader className="space-y-4 pb-6">
                            <div className="flex items-center gap-2.5 text-muted-foreground">
                                <div className="grid size-8 shrink-0 place-content-center rounded-md border bg-background">
                                    <BuildingIcon className="size-4" />
                                </div>
                                <h3 className="text-xl font-semibold tracking-tight">Enterprise Plan</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline font-bold">
                                    <span className="text-4xl tracking-tight">$49</span>
                                    <span className="text-lg text-muted-foreground font-medium">/month</span>
                                </div>
                                <p className="text-sm text-muted-foreground">or $499 yearly (save 15%)</p>
                            </div>
                        </CardHeader>
                        
                        <CardContent className="flex-1 space-y-6">
                            <div>
                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                                    Features Included
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">All Business Plan features, plus:</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Dedicated account manager</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Custom integrations</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Real-time collaboration</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">Role-based permissions</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckIcon className="size-4 text-primary flex-shrink-0" />
                                        <span className="text-sm">24/7 priority support</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <Button variant="outline" className="w-full group mt-8">
                                Contact Sales
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default PricingSection;