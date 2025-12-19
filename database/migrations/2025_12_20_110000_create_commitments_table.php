<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('commitments', function (Blueprint $table) {
      $table->id();
      $table->text('icon')->nullable();
      $table->string('title');
      $table->string('subtitle')->nullable();
      $table->string('status')->default('active');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('commitments');
  }
};
