import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTab } from '../../types';
import { WeatherService } from '../../services/weather.service';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() activeTab: NavTab = 'home';
  @Input() unit: 'C' | 'F' = 'C';
  @Output() tabChange = new EventEmitter<NavTab>();

  public isMobileMenuOpen = false;

  constructor(
    public weatherService: WeatherService,
    public chatbotService: ChatbotService
  ) {}

  public setTab(tab: NavTab): void {
    this.tabChange.emit(tab);
    this.isMobileMenuOpen = false;
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public toggleUnit(): void {
    this.weatherService.toggleUnit();
  }

  public openAssistant(): void {
    this.chatbotService.openChat();
    this.isMobileMenuOpen = false;
  }

  public onLogoError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && img.src.indexOf('7269995.png') === -1) {
      img.src = '/images/7269995.png';
    }
  }
}
